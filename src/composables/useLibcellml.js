import { inject } from 'vue'

// Importing vue3-libcellml.js immediately starts downloading and compiling the
// libcellml WebAssembly module (~2.2 MB), so only the views that actually use
// libcellml should import this composable.
import Vue3LibCellML from 'vue3-libcellml.js'

import { useAppPlugin } from './useAppPlugin'

/**
 * Returns the reactive libcellml state provided by vue3-libcellml.js:
 * `{ status: 'loading' | 'ready', library }`.
 */
export function useLibcellml() {
  useAppPlugin(Vue3LibCellML)
  return inject('$libcellml')
}
