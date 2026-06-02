// markdown-it plugin: walk every text token, replace mapped emoji
// with an inline Tabler icon (<i class="ti ti-NAME ev-ti"></i>).
// Unmapped emoji stay as text — content semantics preserved.
import { emojiToTabler } from './emoji-to-tabler.mjs'

// Build a single regex covering all mapped emoji keys.
// Sort longest-first so multi-codepoint sequences (e.g. "⚠️") win over shorter ones.
const keys = Object.keys(emojiToTabler).sort((a, b) => b.length - a.length)
const escapeForRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const EMOJI_RE = new RegExp(keys.map(escapeForRegex).join('|'), 'g')

function makeIconHtml(name, original) {
  // ev-ti adds inherit color + inline-block alignment (see theme/style.css)
  return `<i class="ti ti-${name} ev-ti" aria-label="${original}" role="img"></i>`
}

function splitTextToken(token, Token) {
  const text = token.content
  if (!text || !EMOJI_RE.test(text)) return null
  EMOJI_RE.lastIndex = 0

  const out = []
  let last = 0
  let m
  while ((m = EMOJI_RE.exec(text)) !== null) {
    const emoji = m[0]
    const name = emojiToTabler[emoji]
    if (!name) continue
    if (m.index > last) {
      const t = new Token('text', '', 0)
      t.content = text.slice(last, m.index)
      out.push(t)
    }
    const html = new Token('html_inline', '', 0)
    html.content = makeIconHtml(name, emoji)
    out.push(html)
    last = m.index + emoji.length
  }
  if (last < text.length) {
    const t = new Token('text', '', 0)
    t.content = text.slice(last)
    out.push(t)
  }
  return out.length ? out : null
}

function walkTokens(tokens, Token) {
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]
    if (tok.children && tok.children.length) {
      const newChildren = []
      for (const child of tok.children) {
        if (child.type === 'text') {
          const split = splitTextToken(child, Token)
          if (split) {
            newChildren.push(...split)
            continue
          }
        }
        newChildren.push(child)
      }
      tok.children = newChildren
    }
  }
}

export default function markdownEmojiTablerPlugin(md) {
  md.core.ruler.push('emoji_to_tabler', (state) => {
    walkTokens(state.tokens, state.Token)
    return false
  })
}
