import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createGtag } from 'vue-gtag'
import { analyticsEnabled, pageViewTemplate } from './js/analytics'

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

// The documentation renderers (vue3-sphinx-xml, vue3-doxygen-xml) and
// libcellml.js are installed by the views that use them, see
// composables/useAppPlugin.js, so they are only downloaded when needed.
app.use(vuetify).mount('#app')
