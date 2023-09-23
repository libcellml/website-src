<template>
  <div class="tutorials">
    <sphinx-page
      :baseURL="`/generated/${store.current_documentation_version}/tutorials`"
      pageNotFoundName="NotFound"
    />
  </div>
</template>

<script setup>
import { useSiteStore } from '@/stores/site'

import { SphinxPage } from 'vue3-sphinx-xml'

const store = useSiteStore()
</script>
