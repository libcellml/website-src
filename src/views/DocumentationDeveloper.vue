<template>
  <div class="developer">
    <sphinx-page
      :baseURL="`/generated/${store.state.current_documentation_version}/developer`"
    />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

import { SphinxPage } from 'vue3-sphinx-xml'

const store = useStore()
</script>

<style src="../css/sphinx.css"></style>
