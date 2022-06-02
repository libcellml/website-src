import { createStore } from 'vuex'
import { getDocumentationVersions } from '@/js/versions'

import * as notifications from '@/store/modules/notifications.js'

const documentationVersions = getDocumentationVersions()

const store = createStore({
  state: {
    breadcrumbs: [],
    current_documentation_version: documentationVersions[0],
    sidebarOpen: false,
    lastURL: ['', '', ''],
    quickLinks: [],
  },
  getters: {
    getBreadcrumbs: (state) => {
      return state.breadcrumbs
    },
    getCurrentDocumentationVersion: (state) => {
      return state.current_documentation_version
    },
    getSidebarState: (state) => {
      return state.sidebarOpen
    },
    getQuickLinks: (state) => {
      return state.quickLinks
    },
    getLastURL: (state) => {
      return state.lastURL[1]
    },
  },
  mutations: {
    setBreadcrumbs: (state, value) => {
      state.breadcrumbs = value
    },
    setCurrentDocumentationVersion: (state, value) => {
      if (documentationVersions.includes(value)) {
        state.current_documentation_version = value
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setQuickLinks: (state, value) => {
      state.quickLinks = value
    },
    updateLastURL: (state, value) => {
      state.lastURL[0] = state.lastURL[1]
      state.lastURL[1] = state.lastURL[2]
      state.lastURL[2] = value
    },
  },
  modules: { notifications },
})

export default store
