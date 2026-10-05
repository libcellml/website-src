/**
 * Page descriptions for <meta name="description">.
 *
 * Search engines usually show this text under the link in their results, and
 * some link previews use it too. Keep each one to a single sentence of about
 * 120-155 characters, with the most important information first.
 *
 * Used by vite.config.mjs (index.html), the router (client-side navigation)
 * and .github/scripts/generate-route-pages.mjs (the static page per route).
 */

export const DEFAULT_DESCRIPTION =
  'libCellML is an open-source C++ library, with Python and JavaScript bindings, for reading, validating and generating code from CellML models.'

// Section path prefix -> description. A path matches if it equals the prefix
// or continues with '/'.
const SECTION_DESCRIPTIONS = [
  [
    '/download',
    'Download libCellML installers for Windows, Linux, and macOS, or install it from PyPI (pip) or npm (libcellml.js).',
  ],
  [
    '/documentation',
    'Tutorials, how-to guides, and API reference for libCellML, the library for reading, validating and generating code from CellML models.',
  ],
  [
    '/services',
    'Validate a CellML 2.0 model, or convert CellML 1.0/1.1 models to CellML 2.0, online in your browser using libCellML.',
  ],
]

export function descriptionForPath(path) {
  for (const [prefix, description] of SECTION_DESCRIPTIONS) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      return description
    }
  }
  return DEFAULT_DESCRIPTION
}
