export const namespaced = true

export const state = {
  dynamicRoutes: [],
  pendingRoutes: [],
}

let nextId = 1

export const mutations = {
  PUSH(state, route) {
    state.dynamicRoutes.push({
      ...route,
      id: nextId++,
    })
  },
  PUSH_PENDING(state, route) {
    state.pendingRoutes.push({
      ...route,
      id: nextId++,
    })
  },
  DELETE_PENDING(state, routeToRemove) {
    state.pendingRoutes = state.pendingRoutes.filter(
      route => route.id !== routeToRemove.id,
    )
  },
}

export const actions = {
  add({ commit }, route) {
    commit('PUSH', route)
  },
  addPending({ commit }, route) {
    commit('PUSH_PENDING', route)
  },
  removePending({ commit }, routeToRemove) {
    commit('DELETE_PENDING', routeToRemove)
  },
}
