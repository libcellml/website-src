import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createGtag } from 'vue-gtag'
import { analyticsEnabled, pageViewTemplate } from './js/analytics'

import { installVue3DoxygenXml } from 'vue3-doxygen-xml'
import 'vue3-doxygen-xml/dist/vue3-doxygen-xml.css'

import { installVue3SphinxXml } from 'vue3-sphinx-xml'
import 'vue3-sphinx-xml/dist/vue3-sphinx-xml.css'

import Vue3LibCellML from 'vue3-libcellml.js'

import './css/sphinx.css'

const pinia = createPinia()

const app = createApp(App).use(pinia).use(router)

// Only load Google Analytics when a measurement ID has been provided
// (set at deploy time), so local development sends nothing.
if (analyticsEnabled) {
  app.use(
    createGtag({
      tagId: import.meta.env.VITE_GA_MEASUREMENT_ID,
      config: {
        // We don't run ads, so don't collect advertising signals.
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
      pageTracker: {
        router,
        template: pageViewTemplate,
      },
    }),
  )
}

app
  .use(vuetify)
  .use(installVue3DoxygenXml)
  .use(installVue3SphinxXml)
  .use(Vue3LibCellML)
  .mount('#app')
