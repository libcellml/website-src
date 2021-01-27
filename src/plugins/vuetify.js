import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import light from './theme'

import APIDocumentationIcon from '@/icons/APIDocumentationIcon'
import UserGuidesIcon from '@/icons/UserGuidesIcon'
import DeveloperGuidesIcon from '@/icons/DeveloperGuidesIcon'
import WindowsOSIcon from '@/icons/WindowsOSIcon'
import MacOSOSIcon from '@/icons/MacOSOSIcon'
import LinuxOSIcon from '@/icons/LinuxOSIcon'
import WebAssemblyIcon from '@/icons/WebAssemblyIcon'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: { light },
  },
  icons: {
    values: {
      apidocumentation: {
        component: APIDocumentationIcon,
      },
      userguides: {
        component: UserGuidesIcon,
      },
      developerguides: {
        component: DeveloperGuidesIcon,
      },
      windowsos: {
        component: WindowsOSIcon,
      },
      macosos: {
        component: MacOSOSIcon,
      },
      linuxos: {
        component: LinuxOSIcon,
      },
      webassembly: {
        component: WebAssemblyIcon,
      },
    },
  },
})
