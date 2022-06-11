<template>
  <div class="doxygen">
    <doxygen-xml :baseURL="`/generated/${store.state.current_documentation_version}/api`" pageNotFoundName="NotFound"/>
  </div>
</template>

<script setup>
import '../css/doxygen.css'

import { useStore } from 'vuex'

import { DoxygenXml } from 'vue3-doxygen-xml'

const store = useStore()

</script>