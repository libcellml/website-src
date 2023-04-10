import { defineStore } from 'pinia'

import { getDocumentationVersions } from '@/js/documentationversions'

const documentationVersions = getDocumentationVersions()

export const useSiteStore = defineStore('site', {
  state: () => ({
    breadcrumbs: [],
    current_documentation_version: documentationVersions[0],
    sidebarOpen: false,
    lastURL: ['', '', ''],
    quickLinks: [],
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
  },
})
