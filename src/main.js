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

// GITHUB API STUFF
// vue-resource is needed too
import VueResource from 'vue-resource'
Vue.use(VueResource)
 
// import vue-github-api
import GitHubAPI from 'vue-github-api'
Vue.use(GitHubAPI, { token: process.env.VUE_APP_GITHUB_TOKEN })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
