<template>
  <div class="notification-container">
    <notification-bar
      v-for="notification in store.current"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup>
import { useNotificationsStore } from '@/stores/notifications'

import NotificationBar from '@/components/NotificationBar.vue'

const store = useNotificationsStore()

</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 3rem;
  right: 0;
  padding-right: 2.5rem;
}
</style>
