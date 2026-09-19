import { defineStore } from 'pinia'

import { getDocumentationVersions } from '@/js/documentationversions'

const documentationVersions = getDocumentationVersions()
const DARK_MODE_STORAGE_KEY = 'libcellml-colour-scheme'

function getInitialDarkMode() {
  const saved = localStorage.getItem(DARK_MODE_STORAGE_KEY)
  if (saved !== null) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useSiteStore = defineStore('site', {
  state: () => ({
    breadcrumbs: [],
    current_documentation_version: documentationVersions[0],
    sidebarOpen: false,
    lastURL: ['', '', ''],
    quickLinks: [],
    darkMode: getInitialDarkMode(),
  }),
  actions: {
    setBreadcrumbs(value) {
      this.breadcrumbs = value
    },
    setCurrentDocumentationVersion(value) {
      if (documentationVersions.includes(value)) {
        this.current_documentation_version = value
      }
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    setQuickLinks(value) {
      this.quickLinks = value
    },
    updateLastURL(value) {
      this.lastURL[0] = this.lastURL[1]
      this.lastURL[1] = this.lastURL[2]
      this.lastURL[2] = value
    },
    setDarkMode(value) {
      this.darkMode = value
      localStorage.setItem(DARK_MODE_STORAGE_KEY, value ? 'dark' : 'light')
    },
    toggleDarkMode() {
      this.setDarkMode(!this.darkMode)
    },
  },
})
