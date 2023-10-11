<template>
  <div class="doxygen">
    <doxygen-xml :baseURL="`/generated/${store.current_documentation_version}/api`" pageNotFoundName="NotFound"/>
  </div>
</template>

<script setup>
import '../css/doxygen.css'

import { useSiteStore } from '@/stores/site'

import { DoxygenXml } from 'vue3-doxygen-xml'

const store = useSiteStore()

</script>