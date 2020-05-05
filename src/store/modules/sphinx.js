import SphinxService from '@/services/SphinxService'

export const namespaced = true

export const state = {
  pages: [],
  inflight: new Map(),
}

export const mutations = {
  APPEND_PAGE(state, page) {
    state.pages.push(page)
  },
  ADD_INFLIGHT(state, id) {
    state.inflight.set(id, 'active')
  },
  REMOVE_INFLIGHT(state, id) {
    state.inflight.delete(id)
  },
}

export const actions = {
  fetchPage({ commit, getters, dispatch }, page_name) {
    if (getters.isInflight(page_name)) {
      return
    }
    commit('ADD_INFLIGHT', page_name)
    return SphinxService.getPage(page_name)
      .then(response => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const documentElement = xmlDoc.querySelector('document')
        commit('APPEND_PAGE', { id: page_name, page: documentElement })
        commit('REMOVE_INFLIGHT', page_name)
        const notification = {
          type: 'success',
          title: 'Page successfully retrieved',
          message: page_name,
        }
        dispatch('notifications/add', notification, { root: true })
        return documentElement
      })
      .catch(error => {
        commit('REMOVE_INFLIGHT', page_name)
        const notification = {
          type: 'error',
          title: 'Page fetch failed: ' + page_name,
          message: error.message,
        }
        dispatch('notifications/add', notification, { root: true })
      })
  },
}

export const getters = {
  getPageById: state => id => {
    return state.pages.find(page => page.id === id)
  },
  isInflight: state => id => {
    return !!state.inflight.get(id)
  },
}
