<template>
  <v-col cols="1">
    <img src="../assets/logo.svg" width="40" height="40" />
  </v-col>
  <v-app-bar-nav-icon @click="onSidebarButtonClicked" />
  <template v-for="link in links" :key="link.label">
    <router-link :to="hash ? link.hashLocation : link.location">
      <v-btn text> {{ link.label }} </v-btn>
    </router-link>
  </template>
  <bug-button></bug-button>
</template>

<script setup>
import { computed } from 'vue'

import { useSiteStore } from '@/stores/site'
import BugButton from './BugButton.vue'

const store = useSiteStore()

const hash = computed(() => {
  return store.breadcrumbs.length < 2
})

const links = [
  { label: 'Home', location: '/#top', hashLocation: '/#top' },
  { label: 'Download', location: '/download', hashLocation: '/#download' },
  {
    label: 'Documentation',
    location: '/documentation',
    hashLocation: '/#documentation',
  },
  { label: 'Services', location: '/services', hashLocation: '/#services' },
  { label: 'About', location: '/about', hashLocation: '/#about' },
]

function onSidebarButtonClicked() {
  store.toggleSidebar()
}
</script>
