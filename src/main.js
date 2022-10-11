import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
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

createApp(App)
  .use(router)
  .use(store)
  .use(installVue3DoxygenXml, { store })
  .use(installVue3SphinxXml, { store })
  .use(vuetify)
  .use(Vue3LibCellML)
  .mount('#app')
