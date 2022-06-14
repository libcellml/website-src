export const namespaced = true

export const state = {
  current: [],
}

let nextId = 1

export const mutations = {
  PUSH(state, notification) {
    state.current.push({
      ...notification,
      id: nextId++,
    })
  },
  DELETE(state, notificationToRemove) {
    state.current = state.current.filter(
      notification => notification.id !== notificationToRemove.id,
    )
  },
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  },
}
