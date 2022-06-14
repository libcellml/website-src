<template>
  <v-btn
    id="backToTopButton"
    title="Scroll to top"
    v-scroll="onScroll"
    v-show="showButton"
    :style="{ left: xOffset, bottom: '0.675rem', position: 'fixed', zIndex: '1005' }"
    fab
    dark
    color="primary"
    @click="toTop"
  >
    <v-icon large>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  xOffset: String,
})

const showButton = ref(false)

function onScroll(e) {
  if (typeof window === 'undefined') {
    return
  }
  const top = window.pageYOffset || e.target.scrollTop || 0
  showButton.value = top > 20
}
function toTop() {
  const url = window.location.pathname + window.location.search
  history.replaceState(history.state, '', url)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
