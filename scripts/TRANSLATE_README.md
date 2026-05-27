# Auto-translate vi-vn stub files

Tool: `scripts/translate_stubs.py`

## Mục đích

Dịch hàng loạt các file `docs/vi-vn/**/*.md` còn ở dạng stub (có banner *"Đang biên dịch sang tiếng Việt"*) sang tiếng Việt thật, lấy nguồn từ `docs/zh-cn/**` ở branch `backup/multilang`.

## Hỗ trợ provider

| Provider | Env var | Default model | Khuyến nghị |
|---|---|---|---|
| Claude (Anthropic) | `ANTHROPIC_API_KEY` | `claude-sonnet-4-5-20250929` | ⭐ Best cho technical content |
| OpenAI | `OPENAI_API_KEY` | `gpt-4o-mini` | Rẻ, nhanh |
| DeepL | `DEEPL_API_KEY` | — | Best translation quality, nhưng kém với markdown phức tạp |

## Cài đặt

Không cần `pip install` — script dùng stdlib (`urllib`, `subprocess`, `concurrent.futures`). Yêu cầu Python 3.10+.

## Lấy API key

- **Claude**: https://console.anthropic.com/settings/keys
- **OpenAI**: https://platform.openai.com/api-keys
- **DeepL**: https://www.deepl.com/pro-api (có tier free 500k chars/tháng)

## Cách dùng

```bash
# Bước 1: export API key (Claude khuyến nghị)
export ANTHROPIC_API_KEY=sk-ant-...

# Bước 2: dry-run xem có bao nhiêu file cần dịch
python3 scripts/translate_stubs.py --dry-run

# Bước 3: test với 1 file trước
python3 scripts/translate_stubs.py \
  --only docs/vi-vn/appendix/1-computer-fundamentals/operating-systems.md

# Bước 4: dịch toàn bộ
python3 scripts/translate_stubs.py --workers 4

# Bước 5: build verify
npm run build
```

## Tính năng

- ✅ **Resume tự động**: file đã dịch sẽ bị skip ở lần chạy tiếp (vì không còn marker stub)
- ✅ **Concurrency**: `--workers N` chạy song song N file
- ✅ **Retry exponential backoff** khi API fail
- ✅ **Validation**: từ chối output ngắn bất thường (< 20% input)
- ✅ **Post-process**: tự rewrite link `/zh-cn/` → `/vi-vn/`
- ✅ **Copy ảnh** từ `docs/zh-cn/<dir>/images/` sang `docs/vi-vn/<dir>/images/` nếu chưa có
- ✅ **Strip preambles**: lọc bỏ "Here is the translation..." mà LLM thi thoảng trả về

## Ước tính chi phí

Có ~148 file stub, tổng ~175k từ Trung. Ước tính token:
- Input: ~250k tokens (≈ 175k chữ Trung)
- Output: ~200k tokens (Vietnamese tương đương)

| Provider | Chi phí ước tính |
|---|---|
| Claude Sonnet 4.5 | ~$2-4 (input $3/M, output $15/M) |
| Claude Haiku 3.5 | ~$0.50 (cần `--model claude-haiku-3-5-...`) |
| GPT-4o-mini | ~$0.30 |
| DeepL Pro | ~$5 (€20/M chars) |
| DeepL Free | $0 (tier 500k chars/tháng — đủ cho project này nếu chia 2 đợt) |

## Tips

- **Chạy thử 1 file trước** bằng `--only` để xem chất lượng có ổn không trước khi chạy full.
- **Claude > OpenAI > DeepL** cho file có Vue components (`<NavGrid>`, `<ChapterIntroduction>`). DeepL hay phá vỡ tag.
- Nếu một file fail (rate limit, timeout), chỉ cần re-run — file đã thành công sẽ bị skip.
- Sau khi dịch xong, **luôn `npm run build`** để verify không broken link/syntax.

## Customize prompt

Sửa `SYSTEM_PROMPT` và `GLOSSARY` trong `translate_stubs.py` nếu muốn:
- Thêm/sửa thuật ngữ
- Đổi tone (formal/informal)
- Đổi cách dịch một số keyword

## Troubleshooting

| Triệu chứng | Khắc phục |
|---|---|
| `ANTHROPIC_API_KEY is not set` | `export ANTHROPIC_API_KEY=sk-ant-...` |
| `urllib.error.HTTPError: 429` (rate limit) | Giảm `--workers 1` hoặc đổi sang Claude Haiku |
| Output có ký tự Trung lẫn | Provider không hiểu prompt — thử Claude Sonnet, hoặc giảm size file |
| Build fail sau dịch | File có markdown bị phá — xem file lỗi, re-run với `--only <path>` để dịch lại |
| Quá chậm | Tăng `--workers 4` hoặc 6 (cẩn thận rate limit) |
