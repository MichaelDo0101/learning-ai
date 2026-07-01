#!/usr/bin/env node
/**
 * Sitemap Generator for Easy-Vibe
 * Generates sitemap.xml for all pages in the documentation
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsDir = path.resolve(__dirname, '../docs')
const publicDir = path.resolve(__dirname, '../docs/public')

// Supported locales
const locales = ['vi-vn', 'en']

// 基础 URL (根据部署环境动态确定)
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.EDGEONE_URL) {
    return `https://${process.env.EDGEONE_URL}`
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL
  }
  return 'https://MichaelDo0101.github.io/learning-ai'
}

const siteUrl = getBaseUrl()
const skipSitemapWrite = process.env.SITEMAP_NO_WRITE === '1'

// 扫描目录中的所有 markdown 文件
function scanMarkdownFiles(dir, basePath = '') {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      // 跳过特殊目录
      if (
        entry.name === '.vitepress' ||
        entry.name === 'node_modules' ||
        entry.name === 'dist' ||
        entry.name === 'public'
      ) {
        continue
      }
      files.push(...scanMarkdownFiles(fullPath, relativePath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relativePath)
    }
  }

  return files
}

// 将 markdown 路径转换为 URL 路径
function mdPathToUrl(mdPath, locale) {
  // Normalize Windows separators before building clean URLs.
  let urlPath = mdPath.replace(/\.md$/, '').replace(/\\/g, '/')

  // 如果是 index.md，只保留目录
  let isIndex = false
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.slice(0, -6)
    isIndex = true
  } else if (urlPath === 'index') {
    urlPath = ''
    isIndex = true
  }

  // 构建完整 URL
  // VitePress "clean URLs" typically map:
  // - index pages to trailing-slash paths: /foo/
  // - non-index pages to non-trailing-slash paths: /foo/bar
  // Having a trailing slash for non-index pages can lead to 404 on static hosts.
  const suffix = isIndex ? '/' : ''
  return `${siteUrl}/${locale}/${urlPath}${suffix}`
}

function getGitLastModified(filePath) {
  try {
    const result = execSync(`git log -1 --format="%aI" -- "${filePath}"`, {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    }).trim()
    if (result) {
      return result
    }
  } catch {
    // 文件可能是新文件或不在 git 中
  }
  const stats = fs.statSync(filePath)
  return stats.mtime.toISOString()
}

function getLatestModTime(files) {
  let latest = '1970-01-01T00:00:00.000Z'
  for (const file of files) {
    const fullPath = path.join(docsDir, file.locale, file.relativePath)
    if (fs.existsSync(fullPath)) {
      const modTime = getGitLastModified(fullPath)
      if (modTime > latest) {
        latest = modTime
      }
    }
  }
  return latest
}

function generateSitemap(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '         xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

  for (const urlInfo of urls) {
    xml += '  <url>\n'
    xml += `    <loc>${escapeXml(urlInfo.loc)}</loc>\n`
    xml += `    <lastmod>${urlInfo.lastmod}</lastmod>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>${urlInfo.priority.toFixed(1)}</priority>\n`

    for (const alternate of urlInfo.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeXml(alternate.href)}"/>\n`
    }

    xml += '  </url>\n'
  }

  xml += '</urlset>\n'
  return xml
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// 主函数
function main() {
  console.log('🔍 Scanning documentation files...')

  const allUrls = []
  const localePaths = new Map()

  // Use Vietnamese as the base/canonical locale
  const baseLocaleDir = path.join(docsDir, 'vi-vn')
  let baseFiles = []

  if (fs.existsSync(baseLocaleDir)) {
    baseFiles = scanMarkdownFiles(baseLocaleDir)
  } else {
    baseFiles = scanMarkdownFiles(docsDir).filter((f) => !f.includes('/'))
  }

  console.log(`📄 Found ${baseFiles} base pages`)

  // 为每个文件生成 URL 信息
  for (const baseFile of baseFiles) {
    // 跳过根目录的 index.md（特殊处理）
    if (baseFile === 'index.md') continue

    const urlInfo = {
      loc: '',
      priority: getPriority(baseFile),
      alternates: [],
      sourceFiles: []
    }

    // 为每个语言版本生成 alternate
    for (const locale of locales) {
      const localeDir = path.join(docsDir, locale)
      const localeFile = path.join(localeDir, baseFile)

      // 检查该语言版本是否存在
      if (fs.existsSync(localeFile)) {
        const url = mdPathToUrl(baseFile, locale)
        urlInfo.alternates.push({
          hreflang: getHreflangCode(locale),
          href: url
        })
        urlInfo.sourceFiles.push({ locale, relativePath: baseFile })

        // Primary canonical URL = Vietnamese
        if (locale === 'vi-vn') {
          urlInfo.loc = url
        }
      }
    }

    // 如果有至少一个语言版本存在
    if (urlInfo.alternates.length > 0) {
      // 如果没有 zh-cn 版本，使用第一个可用的
      if (!urlInfo.loc) {
        urlInfo.loc = urlInfo.alternates[0].href
      }
      urlInfo.lastmod = getLatestModTime(urlInfo.sourceFiles)
      allUrls.push(urlInfo)
    }
  }

  // 添加首页
  const homeAlternates = []
  const homeSourceFiles = []
  for (const locale of locales) {
    homeAlternates.push({
      hreflang: getHreflangCode(locale),
      href: `${siteUrl}/${locale}/`
    })
    const indexPath = path.join(docsDir, locale, 'index.md')
    if (fs.existsSync(indexPath)) {
      homeSourceFiles.push({ locale, relativePath: 'index.md' })
    }
  }
  allUrls.unshift({
    loc: `${siteUrl}/vi-vn/`,
    priority: 1.0,
    alternates: homeAlternates,
    sourceFiles: homeSourceFiles,
    lastmod: getLatestModTime(homeSourceFiles)
  })

  console.log(`🌐 Generating sitemap with ${allUrls.length} URLs...`)

  const sitemapXml = generateSitemap(allUrls)
  const outputPath = path.join(publicDir, 'sitemap.xml')

  let shouldWrite = true
  if (fs.existsSync(outputPath)) {
    const existingXml = fs.readFileSync(outputPath, 'utf-8')
    if (existingXml === sitemapXml) {
      shouldWrite = false
      console.log(`⏭️  Sitemap unchanged, skipping write`)
    }
  }

  if (skipSitemapWrite) {
    shouldWrite = false
    console.log('⏭️  SITEMAP_NO_WRITE=1, skipping sitemap write')
  }

  if (shouldWrite) {
    fs.writeFileSync(outputPath, sitemapXml, 'utf-8')
    console.log(`✅ Sitemap generated at ${outputPath}`)
  }

  console.log(`📊 Statistics:`)
  console.log(`   - Total URLs: ${allUrls.length}`)
  console.log(`   - Locales: ${locales.length}`)
  console.log(`   - Site URL: ${siteUrl}`)
}

function getPriority(filePath) {
  if (filePath.includes('stage-1')) return 0.9
  if (filePath.includes('stage-2')) return 0.8
  if (filePath.includes('stage-3')) return 0.8
  if (filePath.includes('appendix')) return 0.7
  return 0.6
}

function getHreflangCode(locale) {
  const map = {
    'vi-vn': 'vi',
    en: 'en'
  }
  return map[locale] || locale
}

main()
