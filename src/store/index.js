import Vue from 'vue'
import Vuex from 'vuex'

import * as notifications from '@/store/modules/notifications.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen: null,
    dynamicRoutes: [],
    transitionDelay: 1100, // This number has to be higher than my page transition
    pageContentChanged: false,
    breadcrumbs: [],
  },
  getters: {
    getSidebarOpen: state => {
      return state.sidebarOpen
    },
    getDynamicRoutes: state => {
      return state.dynamicRoutes
    },
    getTransitionDelay: state => {
      return state.transitionDelay
    },
    getPageContentChanged: state => {
      return state.pageContentChanged
    },
    hasRoute: state => name => {
      return state.dynamicRoutes.filter(entry => entry.name === name).length > 0
    },
  },
  mutations: {
    setSidebarOpen: (state, value) => {
      state.sidebarOpen = value
    },
    addRoute: (state, value) => {
      state.dynamicRoutes.push(value)
    },
    togglePageContentChanged: state => {
      state.pageContentChanged = !state.pageContentChanged
    },
    setBreadcrumbs: (state, value) => {
      state.breadcrumbs = value
    },
  },
  modules: { notifications },
})
