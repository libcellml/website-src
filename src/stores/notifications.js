import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    current: [],
    nextId: 1,
  }),
  actions: {
    add(notification) {
      this.current.push({
        ...notification,
        id: this.nextId++,
      })
    },
    remove(notificationToRemove) {
      this.current = this.current.filter(
        (notification) => notification.id !== notificationToRemove.id
      )
    },
  },
})
