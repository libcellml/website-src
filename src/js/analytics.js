/**
 * Thin wrapper around gtag for the libCellML website.
 *
 * All custom analytics events go through `trackEvent` so that:
 *  - nothing is sent when Google Analytics is not configured (local dev),
 *  - undefined/null parameters are dropped,
 *  - event names live in one place (see `EVENTS`).
 *
 * Do NOT send user supplied content (file names, model text, etc.) as event
 * parameters. The only user supplied text we send is the search term.
 */

export const EVENTS = {
  VALIDATE_MODEL: 'validate_model',
  TRANSLATE_MODEL: 'translate_model',
  IMPORT_MODEL: 'import_model',
  SERVICE_RESULT_DOWNLOAD: 'service_result_download',
  INSTALLER_DOWNLOAD: 'installer_download',
  PACKAGE_LINK_CLICK: 'package_link_click',
  SEARCH: 'search',
  SELECT_SEARCH_RESULT: 'select_search_result',
  DOCS_VERSION_CHANGE: 'docs_version_change',
  PAGE_NOT_FOUND: 'page_not_found',
  REPORT_ISSUE_CLICK: 'report_issue_click',
  REPORT_ISSUE_HINT_SHOWN: 'report_issue_hint_shown',
  REPORT_ISSUE_HINT_DISMISSED: 'report_issue_hint_dismissed',
  THEME_CHANGE: 'theme_change',
}

export const analyticsEnabled = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID)

export function trackEvent(name, params = {}) {
  const cleaned = {}
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value
    }
  }

  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, cleaned)
  }

  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  try {
    window.gtag('event', name, cleaned)
  } catch (err) {
    // Analytics must never break the site.
    if (import.meta.env.DEV) {
      console.warn('[analytics] failed to send event', name, err)
    }
  }
}

/**
 * Deep links used to arrive via GitHub Pages' 404.html, which redirects to '/'
 * and loses the original referrer. 404.html stores the referrer so that the
 * first page view can report it. Returns the referrer once, then forgets it.
 */
let initialReferrer = null
try {
  initialReferrer = sessionStorage.getItem('redirectReferrer')
  sessionStorage.removeItem('redirectReferrer')
} catch {
  initialReferrer = null
}

export function consumeInitialReferrer() {
  const referrer = initialReferrer
  initialReferrer = null
  return referrer
}

function pageNameToString(pageName) {
  if (Array.isArray(pageName)) {
    return pageName.join('/')
  }
  return pageName || ''
}

/**
 * Work out which documentation set a route belongs to, if any.
 */
export function docSetForRoute(route) {
  if (route.meta && route.meta.subDoc) {
    return route.meta.subDoc
  }
  if (route.name === 'DocumentationAPI') {
    return 'api'
  }
  if (
    route.name === 'DocumentationUser' ||
    route.name === 'DocumentationUserHome'
  ) {
    return 'user'
  }
  if (route.params && route.params.subDoc) {
    return route.params.subDoc
  }
  return undefined
}

/**
 * Builds the page_view parameters for vue-gtag's `pageTrackerTemplate`.
 */
export function pageViewTemplate(to) {
  const pageName = pageNameToString(to.params && to.params.pageName)
  const baseTitle = (to.meta && to.meta.title) || 'libCellML'
  const params = {
    page_title: pageName ? `${baseTitle} | ${pageName}` : baseTitle,
    page_path: to.fullPath,
    page_location: window.location.href,
  }

  const docSet = docSetForRoute(to)
  if (docSet) {
    params.doc_set = docSet
    params.docs_version = (to.params && to.params.version) || 'unversioned'
  }

  const referrer = consumeInitialReferrer()
  if (referrer) {
    params.page_referrer = referrer
  }

  return params
}

/**
 * Helpers for release asset names such as
 * 'libCellML-0.6.3-x64-windows.exe' or 'libcellml-0.6.3-universal-macos.pkg'.
 */
export function platformFromAssetName(name = '') {
  const lower = name.toLowerCase()
  if (lower.includes('windows')) return 'windows'
  if (lower.includes('macos')) return 'macos'
  if (lower.includes('ubuntu') || lower.includes('linux')) return 'linux'
  return 'other'
}

export function extensionFromAssetName(name = '') {
  const lower = name.toLowerCase()
  if (lower.endsWith('.tar.gz')) return 'tar.gz'
  const index = lower.lastIndexOf('.')
  return index === -1 ? undefined : lower.substring(index + 1)
}

export function trackInstallerDownload(
  assetName,
  version,
  isLatest,
  linkLocation,
) {
  trackEvent(EVENTS.INSTALLER_DOWNLOAD, {
    file_name: assetName,
    file_extension: extensionFromAssetName(assetName),
    platform: platformFromAssetName(assetName),
    version,
    is_latest: isLatest ? 'yes' : 'no',
    link_location: linkLocation,
  })
}
