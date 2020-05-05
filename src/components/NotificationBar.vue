<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <v-card :color="colour" dark>
      <v-card-title class="headline">{{ notification.title }}</v-card-title>

      <v-card-subtitle>{{ notification.message }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  mounted() {
    let timeout = 5000
    if (this.notification.type === 'success') {
      timeout = 1000
    }
    this.timeout = setTimeout(() => {
      this.remove(this.notification)
    }, timeout)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    },
    colour() {
      return this.notification.type === 'error' ? '#8b0000' : '#006400'
    },
  },
  methods: mapActions('notifications', ['remove']),
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}

.-text-success {
  color: #006400;
}

.-text-error {
  color: #8b0000;
}
</style>
