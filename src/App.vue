<template>
  <v-app id="top">
    <v-app-bar app clipped-left>
      <nav-bar-content />
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="sidebarState"
      id="sideMenuPanel"
      width="256"
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
        <div id="pageMainContent">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <notification-container />
    <v-footer app bottom fixed><footer-content /></v-footer>
  </v-app>
</template>

<script setup>
import { computed, inject } from 'vue'

import { useSiteStore } from './stores/site'
import BreadCrumbs from './components/BreadCrumbs.vue'
import BackToTop from './components/BackToTop.vue'
import FooterContent from './components/FooterContent.vue'
import NotificationContainer from './components/NotificationContainer.vue'
import SidebarContent from './components/SidebarContent.vue'
import NavBarContent from './components/NavBarContent.vue'

import './css/general.css'

const store = useSiteStore()

const sidebarOverlaySizes = ['xs', 'sm', 'md']

const getXOffset = computed(() => {
  const vuetifyDisplay = inject(Symbol.for('vuetify:display'))
  if (sidebarOverlaySizes.includes(vuetifyDisplay.name.value)) {
    return '1rem'
  }
  return store.sidebarOpen ? '17rem' : '1rem'
})

const sidebarState = computed({
  get() {
    return store.sidebarOpen
  },
  set(val) {
    store.sidebarOpen = val
  },
})
</script>
