<template>
  <div class="notification-bar">
    <v-card :color="notification.type" dark>
      <v-card-title class="headline">{{ notification.title }}</v-card-title>
      <v-card-subtitle>{{ notification.message }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, toRefs } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

let timeout = null

const props = defineProps({
    notification: {
      type: Object,
      required: true,
    },
})

const { notification } = toRefs(props)

onMounted(() => {
  timeout = setTimeout(() => {
    store.dispatch('notifications/remove', notification.value)
  }, notification.value.type === 'success' ? 1000 : 5000)
})
onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
