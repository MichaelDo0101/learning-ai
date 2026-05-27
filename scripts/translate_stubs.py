#!/usr/bin/env python3
"""
Auto-translate remaining stub files in docs/vi-vn/ from the zh-cn originals.

Workflow:
  1. Scan docs/vi-vn/ for files containing the stub marker
  2. For each stub, fetch the matching zh-cn source from the `backup/multilang`
     git branch (it lives only there because we removed docs/zh-cn/*.md earlier)
  3. Call a translation API to convert zh-cn markdown to vi-vn markdown
  4. Post-process: rewrite /zh-cn/ links to /vi-vn/, copy image folder if present
  5. Write result to docs/vi-vn/<same_path>

Providers supported:
  - claude  (Anthropic Messages API, recommended for technical content)
  - openai  (GPT-4o-mini)
  - deepl   (DeepL Pro API)

Usage:
  # Translate all stubs with Claude (default)
  ANTHROPIC_API_KEY=sk-... python3 scripts/translate_stubs.py

  # Single file (good for testing)
  ANTHROPIC_API_KEY=sk-... python3 scripts/translate_stubs.py \\
      --only docs/vi-vn/appendix/1-computer-fundamentals/operating-systems.md

  # Dry-run (list what would be translated, no API calls)
  python3 scripts/translate_stubs.py --dry-run

  # Choose provider / model
  python3 scripts/translate_stubs.py --provider openai --model gpt-4o-mini
  python3 scripts/translate_stubs.py --provider deepl

  # Parallelism + resume (already-translated files are skipped automatically)
  python3 scripts/translate_stubs.py --workers 4

Requires Python 3.10+. No external pip packages — uses urllib for HTTP calls.
"""
from __future__ import annotations

import argparse
import concurrent.futures as cf
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

# --- Constants ---------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parent.parent
VI_DIR = REPO_ROOT / "docs" / "vi-vn"
BACKUP_BRANCH = "backup/multilang"
STUB_MARKER = "Đang biên dịch sang tiếng Việt"  # the warning text the skeleton script wrote

GLOSSARY = """
Glossary (zh -> vi):
- Vibe Coding -> giữ nguyên "Vibe Coding"
- AI Agent / Agent -> giữ "Agent"
- LLM, MCP, RAG, OCR, API, SDK, CLI, IDE, SaaS, PRD -> giữ nguyên (viết hoa)
- 大语言模型 / Large Language Model -> "mô hình ngôn ngữ lớn (LLM)"
- 提示词 / Prompt -> "prompt"
- 上下文 / Context -> "context"
- 工作流 / Workflow -> "workflow"
- 前端 / Frontend -> "frontend"
- 后端 / Backend -> "backend"
- 全栈 / Full-stack -> "full-stack"
- 产品经理 / PM -> "PM" hoặc "Product Manager"
- 学习地图 -> "lộ trình học"
- 实战 -> "thực chiến"
- 新手 / 入门 -> "nhập môn" / "newbie"
- 进阶 -> "nâng cao"
- 高级 -> "nâng cao" / "cao cấp"
- 工程师 -> "kỹ sư" / "engineer"
- 架构 -> "kiến trúc"
- 部署 -> "deploy"
- 数据库 -> "database" / "cơ sở dữ liệu"
- 缓存 -> "cache"
- 队列 -> "queue"
- 认证 / 鉴权 -> "auth" / "xác thực"
- 授权 / Authorization -> "phân quyền"
- 接口 -> "API" hoặc "interface" (theo ngữ cảnh)
""".strip()

SYSTEM_PROMPT = (
    "You are a professional Vietnamese technical translator for a Chinese-language "
    "AI programming curriculum (Easy-Vibe by Datawhale, CC-BY-NC-SA-4.0). "
    "Your job is to translate Simplified Chinese markdown into natural, fluent "
    "Vietnamese suitable for Vietnamese readers learning AI coding.\n\n"
    "Strict rules:\n"
    "1. Output ONLY the translated markdown, no preamble or commentary.\n"
    "2. Preserve all markdown structure: headings, lists, tables, blockquotes, "
    "Vue/Element-Plus components (`<NavGrid>`, `<ChapterIntroduction>`, etc.), "
    "VitePress containers (`::: tip`, `::: warning`, `::: details`), and YAML "
    "frontmatter.\n"
    "3. Keep ALL code blocks verbatim. Only translate code comments and string "
    "literals when they are user-facing. Never change identifiers, function names, "
    "variable names, file paths, env-var names, or shell commands.\n"
    "4. Keep all image references, links, emoji, HTML tags, and URLs unchanged. "
    "EXCEPTION: rewrite internal links from `/zh-cn/...` to `/vi-vn/...`.\n"
    "5. Keep brand names (Claude, GPT, Cursor, Trae, Figma, Stripe, Supabase, "
    "GitHub, Dify, MasterGo, etc.) in their original form.\n"
    "6. For technical terms, follow the glossary below. When a Chinese term has "
    "a well-known English equivalent (e.g. API, MCP, RAG), keep the English term "
    "instead of inventing a Vietnamese coinage.\n"
    "7. Tone: friendly, instructive, second-person 'bạn'. Concise — Vietnamese "
    "should be roughly the same length as the Chinese, not padded.\n"
    "8. Vietnamese must have proper diacritics. Never output undecorated ASCII "
    "transliteration.\n\n"
    + GLOSSARY
)

# --- Data classes ------------------------------------------------------------

@dataclass
class Job:
    rel_path: str       # e.g. "appendix/1-computer-fundamentals/operating-systems.md"
    vi_path: Path
    zh_path_in_git: str  # e.g. "docs/zh-cn/appendix/1-computer-fundamentals/operating-systems.md"
    src_text: str
    src_tokens: int      # rough estimate

@dataclass
class Result:
    rel_path: str
    ok: bool
    bytes_in: int
    bytes_out: int
    elapsed_s: float
    error: str | None = None

# --- Helpers -----------------------------------------------------------------

def find_stub_files() -> list[Path]:
    """All vi-vn .md files still containing the stub marker."""
    stubs = []
    for path in sorted(VI_DIR.rglob("*.md")):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        if STUB_MARKER in text:
            stubs.append(path)
    return stubs

def git_show(ref_path: str) -> str:
    """`git show backup/multilang:<ref_path>` -> file content, or '' if missing."""
    res = subprocess.run(
        ["git", "show", f"{BACKUP_BRANCH}:{ref_path}"],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if res.returncode != 0:
        return ""
    return res.stdout

def vi_to_zh_path(vi_path: Path) -> str:
    """docs/vi-vn/foo/bar.md -> docs/zh-cn/foo/bar.md (git path string)."""
    rel = vi_path.relative_to(REPO_ROOT / "docs" / "vi-vn")
    return f"docs/zh-cn/{rel.as_posix()}"

def postprocess(md: str) -> str:
    """Rewrite /zh-cn/ links to /vi-vn/ and trim provider chatter."""
    # rewrite internal links
    md = md.replace("/zh-cn/", "/vi-vn/").replace("(zh-cn/", "(vi-vn/")
    # strip common LLM preambles that sometimes slip through despite the system prompt
    PREAMBLES = (
        "Here is the Vietnamese translation",
        "Here is the translation",
        "Bản dịch tiếng Việt:",
        "Dưới đây là bản dịch",
        "```markdown\n",
    )
    s = md.lstrip()
    for p in PREAMBLES:
        if s.lower().startswith(p.lower()):
            s = s[len(p):].lstrip(":\n ")
    # strip trailing ``` if the model wrapped output in a code fence
    if s.startswith("```") and s.rstrip().endswith("```"):
        lines = s.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        s = "\n".join(lines)
    return s

def copy_images_if_any(rel_path: str) -> None:
    """If docs/zh-cn/<dir>/images exists, mirror it to docs/vi-vn/<dir>/images."""
    dir_in_vi = (VI_DIR / rel_path).parent
    dir_in_zh = REPO_ROOT / "docs" / "zh-cn" / Path(rel_path).parent
    src_images = dir_in_zh / "images"
    dst_images = dir_in_vi / "images"
    if src_images.is_dir() and not dst_images.exists():
        shutil.copytree(src_images, dst_images)

# --- Providers ---------------------------------------------------------------

class TranslationError(RuntimeError):
    pass

def call_claude(text: str, model: str) -> str:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise TranslationError("ANTHROPIC_API_KEY is not set")
    payload = {
        "model": model,
        "max_tokens": 8192,
        "system": SYSTEM_PROMPT,
        "messages": [
            {
                "role": "user",
                "content": f"Translate the following Chinese markdown to Vietnamese.\n\n---\n\n{text}",
            }
        ],
    }
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        body = json.loads(resp.read())
    parts = body.get("content", [])
    if not parts:
        raise TranslationError(f"Empty Claude response: {body}")
    return "".join(p.get("text", "") for p in parts if p.get("type") == "text")

def call_openai(text: str, model: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise TranslationError("OPENAI_API_KEY is not set")
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": f"Translate the following Chinese markdown to Vietnamese.\n\n---\n\n{text}",
            },
        ],
        "temperature": 0.2,
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "authorization": f"Bearer {api_key}",
            "content-type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        body = json.loads(resp.read())
    return body["choices"][0]["message"]["content"]

def call_deepl(text: str, _model: str) -> str:
    api_key = os.environ.get("DEEPL_API_KEY")
    if not api_key:
        raise TranslationError("DEEPL_API_KEY is not set")
    # DeepL Pro endpoint; free tier uses api-free.deepl.com
    endpoint = (
        "https://api-free.deepl.com/v2/translate"
        if api_key.endswith(":fx")
        else "https://api.deepl.com/v2/translate"
    )
    data = (
        f"auth_key={api_key}&source_lang=ZH&target_lang=VI&tag_handling=html&"
        f"text={urllib.parse.quote(text)}"
    ).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=data,
        headers={"content-type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        body = json.loads(resp.read())
    return body["translations"][0]["text"]

PROVIDERS: dict[str, tuple[Callable[[str, str], str], str]] = {
    "claude": (call_claude, "claude-sonnet-4-5-20250929"),
    "openai": (call_openai, "gpt-4o-mini"),
    "deepl":  (call_deepl, ""),
}

# --- Pipeline ----------------------------------------------------------------

def gather_jobs(limit_to: Path | None) -> list[Job]:
    jobs: list[Job] = []
    files = [limit_to] if limit_to else find_stub_files()
    for vi_path in files:
        rel = vi_path.relative_to(VI_DIR).as_posix()
        zh_git_path = vi_to_zh_path(vi_path)
        src = git_show(zh_git_path)
        if not src.strip():
            print(f"  ⚠ skip (no zh source in backup): {rel}")
            continue
        jobs.append(Job(rel, vi_path, zh_git_path, src, len(src) // 3))
    return jobs

def translate_one(job: Job, provider: str, model: str, max_retries: int = 3) -> Result:
    t0 = time.time()
    fn, default_model = PROVIDERS[provider]
    use_model = model or default_model
    delay = 2.0
    last_err = None
    for attempt in range(1, max_retries + 1):
        try:
            out = fn(job.src_text, use_model)
            out = postprocess(out)
            if len(out) < 0.2 * len(job.src_text):
                raise TranslationError(
                    f"Suspiciously short output ({len(out)} chars vs {len(job.src_text)} input)"
                )
            job.vi_path.write_text(out, encoding="utf-8")
            copy_images_if_any(job.rel_path)
            return Result(job.rel_path, True, len(job.src_text), len(out), time.time() - t0)
        except (urllib.error.HTTPError, urllib.error.URLError, TranslationError) as e:
            last_err = str(e)
            if attempt < max_retries:
                time.sleep(delay)
                delay *= 2
    return Result(job.rel_path, False, len(job.src_text), 0, time.time() - t0, last_err)

def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--provider", choices=PROVIDERS.keys(), default="claude")
    p.add_argument("--model", default="", help="Override default model for the provider")
    p.add_argument("--only", type=Path, help="Translate only this one vi-vn .md file")
    p.add_argument("--workers", type=int, default=2, help="Parallel API calls (default 2)")
    p.add_argument("--dry-run", action="store_true", help="List jobs without calling the API")
    args = p.parse_args()

    if args.only and not args.only.exists():
        print(f"--only file not found: {args.only}", file=sys.stderr)
        return 2

    jobs = gather_jobs(args.only.resolve() if args.only else None)
    if not jobs:
        print("No stub files found. Nothing to do.")
        return 0

    total_in = sum(j.src_tokens for j in jobs)
    print(f"Stub files found: {len(jobs)}  | est. input tokens: ~{total_in:,}")
    if args.dry_run:
        for j in jobs:
            print(f"  - {j.rel_path}  ({len(j.src_text):,} chars)")
        return 0

    print(f"Provider: {args.provider}  Workers: {args.workers}")
    print("-" * 64)

    done = 0
    failed = 0
    with cf.ThreadPoolExecutor(max_workers=args.workers) as ex:
        futures = {ex.submit(translate_one, j, args.provider, args.model): j for j in jobs}
        for fut in cf.as_completed(futures):
            res = fut.result()
            done += 1
            tag = "✓" if res.ok else "✗"
            print(
                f"  {tag} [{done:>3}/{len(jobs)}] {res.rel_path}  "
                f"{res.bytes_in:>6}→{res.bytes_out:>6} chars  "
                f"{res.elapsed_s:5.1f}s"
                + (f"  ERROR: {res.error}" if not res.ok else "")
            )
            if not res.ok:
                failed += 1

    print("-" * 64)
    print(f"Done: {done - failed} ok, {failed} failed.")
    if failed:
        print("Re-run the script to retry failed files (already-translated files are skipped).")
    return 1 if failed else 0

if __name__ == "__main__":
    sys.exit(main())
