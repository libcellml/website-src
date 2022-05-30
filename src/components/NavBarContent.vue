<template>
  <v-col cols="1">
    <img src="../assets/logo.svg" width="40" height="40" />
  </v-col>
  <v-app-bar-nav-icon @click="onSidebarButtonClicked" />
  <template v-for="link in links" :key="link.label">
    <router-link :to="link.location">
      <v-btn text>
        {{ link.label }}
      </v-btn>
    </router-link>
  </template>
  <bug-button></bug-button>
</template>

<script setup>
import { useStore } from 'vuex';

import BugButton from './BugButton.vue'

const store = useStore()

const links = [
  { label: 'Home', location: '/#top' },
  { label: 'Download', location: '/#download' },
  { label: 'Documentation', location: '/#documentation' },
  { label: 'Services', location: '/#services' },
  { label: 'About', location: '/#about' },
]

function onSidebarButtonClicked() {
  store.commit('toggleSidebar')
}

</script>