<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    NotificationBar,
  },
  computed: mapState('notifications', ['notifications']),
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 30px;
  right: 0;
  padding-right: 40px;
}
</style>
