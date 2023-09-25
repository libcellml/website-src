import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueGtag from 'vue-gtag'

import { loadFonts } from './plugins/webfontloader'

import { installVue3DoxygenXml } from 'vue3-doxygen-xml'
import 'vue3-doxygen-xml/dist/style.css'

import { installVue3SphinxXml } from 'vue3-sphinx-xml'
import 'vue3-sphinx-xml/dist/style.css'
// Set the style of code blocks highlighting from highlight.js.
import 'highlight.js/styles/qtcreator-light.css'

import Vue3LibCellML from 'vue3-libcellml.js'

import './css/sphinx.css'

loadFonts()

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(
    VueGtag,
    {
      pageTrackerUseFullPath: true,
      config: { id: import.meta.env.VITE_GA_MEASUREMENT_ID },
    },
    router,
  )
  .use(vuetify)
  .use(installVue3DoxygenXml)
  .use(installVue3SphinxXml)
  .use(Vue3LibCellML)
  .mount('#app')
