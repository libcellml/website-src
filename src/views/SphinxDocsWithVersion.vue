<template>
  <div :class="route.params.subDoc">
    <sphinx-page
      :baseURL="`/generated/${store.current_documentation_version}/${route.params.subDoc}`"
      pageNotFoundName="NotFound"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useSiteStore } from '@/stores/site'

import { SphinxPage } from 'vue3-sphinx-xml'

const store = useSiteStore()
const route = useRoute()
</script>
