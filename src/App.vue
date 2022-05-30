<template>
  <v-app id="top">
    <v-app-bar app clipped-left>
      <nav-bar-content />
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="sidebarState"
      id="sideMenuPanel"
      clipped
      stateless
    >
      <sidebar-content />
    </v-navigation-drawer>
    <back-to-top :xOffset="getXOffset" />
    <v-main>
      <v-container>
        <v-row mx="4">
          <v-col>
            <bread-crumbs />
          </v-col>
        </v-row>
        <router-view />
      </v-container>
    </v-main>
    <notification-container />
    <v-footer app bottom fixed><footer-content /></v-footer>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import BreadCrumbs from './components/BreadCrumbs.vue'
import BackToTop from './components/BackToTop.vue'
import FooterContent from './components/FooterContent.vue'
import NotificationContainer from './components/NotificationContainer.vue'
import SidebarContent from './components/SidebarContent.vue'
import NavBarContent from './components/NavBarContent.vue'

import './css/general.css'

const store = useStore()

const getXOffset = computed(() => {
  return '1rem'
})

const sidebarState = computed({
  get() {
    return store.state.sidebarOpen
  },
  set(val) {
    store.state.sidebarOpen = val
  },
})
</script>
