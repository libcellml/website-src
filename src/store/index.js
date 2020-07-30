import Vue from 'vue'
import Vuex from 'vuex'

import * as notifications from '@/store/modules/notifications.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen: null,
    dynamicRoutes: [],
  },
  getters: {
    getSidebarOpen: state => {
      return state.sidebarOpen
    },
    getDynamicRoutes: state => {
      return state.dynamicRoutes
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
  },
  modules: { notifications },
})
