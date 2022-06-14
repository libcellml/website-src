<template>
  <div id="documentationContent">
    <h1>Documentation</h1>
    <documentation-buttons />
    <h3>Documentation versions</h3>
    <p>
      The links above will take you to the latest version of the available
      documentation. For older versions of the documentation, please visit the
      <router-link to="/documentation">Documentation landing page</router-link>.
    </p>
  </div>
</template>

<script setup>
import DocumentationButtons from '../DocumentationButtons.vue'
</script>
