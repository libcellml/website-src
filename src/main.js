import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import DoxygenXml from 'vue-doxygen-xml'
import SphinxXml from 'vue-sphinx-xml'
import VueHighlightJS from 'vue-highlightjs'
import VueKatex from 'vue-katex'

import 'highlight.js/styles/xcode.css'
import './css/general.css'
import 'katex/dist/katex.min.css'

Vue.use(DoxygenXml, { store })
Vue.use(SphinxXml, { store })
Vue.use(VueHighlightJS)
Vue.use(VueKatex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
