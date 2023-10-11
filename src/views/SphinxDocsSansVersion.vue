<template>
  <div :class="route.meta.subDoc">
    <sphinx-page
      :baseURL="`/generated/${route.meta.subDoc}`"
      pageNotFoundName="NotFound"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { SphinxPage } from 'vue3-sphinx-xml'

const route = useRoute()
</script>
