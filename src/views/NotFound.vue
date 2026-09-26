<template>
  <v-row>
    <v-col>
      <h1>Oops!</h1>
      <broken-link />
      <br />
      <router-link to="/">Back to the home page</router-link>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import BrokenLink from '../components/BrokenLink.vue'
import { EVENTS, trackEvent } from '@/js/analytics'

const route = useRoute()

onMounted(() => {
  // vue-router keeps the previous in-app location in history.state.back.
  const previousPath = window.history.state && window.history.state.back
  trackEvent(EVENTS.PAGE_NOT_FOUND, {
    missing_path: (route.query.path || route.fullPath).substring(0, 100),
    previous_path: previousPath
      ? String(previousPath).substring(0, 100)
      : 'none',
  })
})
</script>
