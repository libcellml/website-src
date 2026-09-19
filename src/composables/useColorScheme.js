/**
 * useColorScheme
 *
 * Centralises dark/light mode logic.
 *
 * - On first use, reads the saved preference from the Pinia site store
 *   (which itself bootstraps from localStorage → OS preference).
 * - Drives Vuetify's theme engine so all Vuetify components switch instantly.
 * - Watches for OS-level preference changes and updates automatically
 *   when the user has not yet saved an explicit choice.
 * - Exposes `isDark` (computed ref) and `toggle()` for use in any component.
 */

import { computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import { useSiteStore } from '@/stores/site'

const DARK_MODE_STORAGE_KEY = 'libcellml-colour-scheme'

export function useColorScheme() {
  const theme = useTheme()
  const store = useSiteStore()

  const isDark = computed(() => store.darkMode)

  function applyTheme(dark) {
    theme.global.name.value = dark ? 'dark' : 'light'
  }

  function toggle() {
    store.toggleDarkMode()
    applyTheme(store.darkMode)
  }

  function setDark(value) {
    store.setDarkMode(value)
    applyTheme(value)
  }

  // React to OS-level changes only when the user has not pinned a choice
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  function onSystemChange(e) {
    if (localStorage.getItem(DARK_MODE_STORAGE_KEY) === null) {
      setDark(e.matches)
    }
  }

  onMounted(() => {
    // Sync Vuetify with whatever the store resolved at startup
    applyTheme(store.darkMode)
    mediaQuery.addEventListener('change', onSystemChange)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', onSystemChange)
  })

  return { isDark, toggle, setDark }
}
