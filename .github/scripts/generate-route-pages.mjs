/**
 * Generate a copy of the built index.html for every known route.
 *
 * GitHub Pages only serves files that exist. Without this step every deep
 * link (e.g. /services/validate) is answered by 404.html with an HTTP 404
 * status, which:
 *  - stops search engines from indexing the documentation, and
 *  - loses the original referrer, breaking analytics attribution.
 *
 * Writing <route>.html lets GitHub Pages answer /route with a 200 and the
 * normal single page application, which then routes client side.
 * Unknown URLs still fall through to 404.html.
 *
 * Usage: node .github/scripts/generate-route-pages.mjs [distDir] [siteUrl]
 *   If siteUrl is given (e.g. https://libcellml.org) a sitemap.xml is written
 *   and linked from robots.txt.
 */
import * as fs from 'fs'
import * as path from 'path'

import { getDocumentationVersions } from '../../src/js/documentationversions.js'
import { useCommon } from '../../src/composables/common.js'
import { descriptionForPath } from '../../src/js/pageDescriptions.js'

const distDir = path.resolve(process.argv[2] || 'dist')
const siteUrl = process.argv[3] ? process.argv[3].replace(/\/$/, '') : null
const generatedDir = path.resolve('public', 'generated')

const { documentationInfoMap } = useCommon()

const staticRoutes = {
  '/about': 'libCellML: About',
  '/documentation': 'libCellML: Documentation',
  '/services': 'libCellML: Services',
  '/services/validate': 'libCellML: Validate',
  '/services/translate': 'libCellML: Translate',
  '/services/import': 'libCellML: Import',
  '/download': 'libCellML: Download',
  '/search': 'libCellML: Search Results',
}

function listPages(dir) {
  // Returns page paths (without .xml) relative to dir, skipping Sphinx/Doxygen
  // support directories such as _static, _images and resources.
  const pages = []
  if (!fs.existsSync(dir)) {
    return pages
  }
  const walk = (current, rel) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
        continue
      }
      const entryRel = rel ? `${rel}/${entry.name}` : entry.name
      if (entry.isDirectory()) {
        if (entry.name !== 'resources') {
          walk(path.join(current, entry.name), entryRel)
        }
      } else if (entry.name.endsWith('.xml')) {
        pages.push(entryRel.slice(0, -'.xml'.length))
      }
    }
  }
  walk(dir, '')
  return pages
}

function subDocTitle(subDoc) {
  const info = documentationInfoMap[subDoc]
  if (subDoc === 'user') {
    return 'libCellML: User Guides'
  }
  return info ? `libCellML: ${info.name}` : 'libCellML: Documentation'
}

// route -> { title, inSitemap }
const routes = new Map()
function addRoute(route, title, inSitemap = true) {
  if (!routes.has(route)) {
    routes.set(route, { title, inSitemap })
  }
}

for (const [route, title] of Object.entries(staticRoutes)) {
  addRoute(route, title, route !== '/search')
}

// Unversioned documentation.
for (const subDoc of ['theory', 'installation']) {
  const title = `libCellML: ${subDoc[0].toUpperCase()}${subDoc.slice(1)}`
  addRoute(`/documentation/${subDoc}`, title)
  for (const page of listPages(path.join(generatedDir, subDoc))) {
    addRoute(`/documentation/${subDoc}/${page}`, title)
  }
}

// Versioned documentation.
const versions = getDocumentationVersions()
const latest = versions[0]
for (const version of versions) {
  const versionDir = path.join(generatedDir, version)
  if (!fs.existsSync(versionDir)) {
    continue
  }
  for (const entry of fs.readdirSync(versionDir, { withFileTypes: true })) {
    const subDoc = entry.name
    if (!entry.isDirectory() || !(subDoc in documentationInfoMap)) {
      continue
    }
    const title = subDocTitle(subDoc)
    const pages = listPages(path.join(versionDir, subDoc))
    const aliases = version === latest ? [version, 'latest'] : [version]
    for (const alias of aliases) {
      const inSitemap = alias !== 'latest'
      addRoute(`/documentation/${alias}/${subDoc}`, title, inSitemap)
      for (const page of pages) {
        addRoute(`/documentation/${alias}/${subDoc}/${page}`, title, inSitemap)
      }
    }
  }
}

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

let written = 0
let skipped = 0
for (const [route, { title }] of routes) {
  const target = path.join(distDir, `${route.slice(1)}.html`)
  if (fs.existsSync(target)) {
    skipped += 1
    continue
  }
  fs.mkdirSync(path.dirname(target), { recursive: true })
  const html = indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${escapeHtml(descriptionForPath(route))}$2`,
    )
  fs.writeFileSync(target, html)
  written += 1
}
console.log(`Route pages: wrote ${written}, skipped ${skipped} existing.`)

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    '/',
    ...[...routes].filter(([, v]) => v.inSitemap).map(([r]) => r),
  ]
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `  <url><loc>${escapeHtml(siteUrl + u)}</loc><lastmod>${today}</lastmod></url>`,
      )
      .join('\n') +
    '\n</urlset>\n'
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
  const robotsPath = path.join(distDir, 'robots.txt')
  if (!fs.existsSync(robotsPath)) {
    fs.writeFileSync(
      robotsPath,
      `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    )
  }
  console.log(`Sitemap: ${urls.length} URLs.`)
}
