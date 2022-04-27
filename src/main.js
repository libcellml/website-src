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

import libCellMLModule from 'libcellml.js'
import libCellMLWasm from 'libcellml.js/libcellml.wasm'

Vue.use(DoxygenXml, { store })
Vue.use(SphinxXml, { store })
Vue.use(VueHighlightJS)
Vue.use(VueKatex)

Vue.config.productionTip = false
Vue.prototype.$libcellml = null

const init = async () => {
  Vue.prototype.$libcellml = await new libCellMLModule({
    locateFile(path, prefix) {
      if (path === 'libcellml.wasm') {
        return libCellMLWasm
      }
      return prefix + path
    },
  })

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount('#app')
}

init()
