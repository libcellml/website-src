<template>
  <div class="doxygen">
    <doxygen-xml :baseURL="`/generated/${store.current_documentation_version}/api`" pageNotFoundName="NotFound"/>
  </div>
</template>

<script setup>
import '../css/doxygen.css'

import { useSiteStore } from '@/stores/site'

import { DoxygenXml, installVue3DoxygenXml } from 'vue3-doxygen-xml'
import 'vue3-doxygen-xml/dist/vue3-doxygen-xml.css'
import { useAppPlugin } from '@/composables/useAppPlugin'

useAppPlugin(installVue3DoxygenXml)

const store = useSiteStore()

</script>