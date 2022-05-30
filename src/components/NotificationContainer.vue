<template>
  <div class="notification-container">
    <notification-bar
      v-for="notification in store.state.notifications.current"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

import NotificationBar from '@/components/NotificationBar.vue'

const store = useStore()

</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 3rem;
  right: 0;
  padding-right: 2.5rem;
}
</style>
