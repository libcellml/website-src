<template>
  <v-app id="top">
    <v-app-bar app clipped-left id="app-header">
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
import { computed, inject, watch, onMounted } from 'vue'

import { useSiteStore } from './stores/site'
import { useColorScheme } from './composables/useColorScheme'
import BreadCrumbs from './components/BreadCrumbs.vue'
import BackToTop from './components/BackToTop.vue'
import FooterContent from './components/FooterContent.vue'
import NotificationContainer from './components/NotificationContainer.vue'
import SidebarContent from './components/SidebarContent.vue'
import NavBarContent from './components/NavBarContent.vue'

// highlight.js stylesheet URLs — Vite resolves and fingerprints these at
// build time so the ?url import gives the correct hashed production path.
import hljsLightUrl from 'highlight.js/styles/qtcreator-light.css?url'
import hljsDarkUrl from 'highlight.js/styles/qtcreator-dark.css?url'

import './css/general.css'

const store = useSiteStore()
const vuetifyDisplay = inject(Symbol.for('vuetify:display'))

// Initialise dark mode — this also applies the Vuetify theme and starts
// listening for OS-level preference changes.
const { isDark } = useColorScheme()

// highlight.js dynamic stylesheet
const HLJS_LINK_ID = 'hljs-theme'

function applyHljsTheme(dark) {
  let link = document.getElementById(HLJS_LINK_ID)
  if (!link) {
    link = document.createElement('link')
    link.id = HLJS_LINK_ID
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  link.href = dark ? hljsDarkUrl : hljsLightUrl
}

onMounted(() => {
  applyHljsTheme(isDark.value)
})

watch(isDark, (dark) => {
  applyHljsTheme(dark)
})

const sidebarOverlaySizes = ['xs', 'sm', 'md']

const getXOffset = computed(() => {
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
