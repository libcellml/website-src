import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueHighlightJS from 'vue-highlightjs'
import VHighlightJS from 'v-highlightjs'
// Vue.use(VueHighlightJS)
Vue.use(VHighlightJS)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
