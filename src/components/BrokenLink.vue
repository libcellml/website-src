<template>
  <v-row>
    <v-col>
      <p>The page that you've requested:</p>
      <br />
      <h4>{{ route.query.path }}</h4>
      <br />
      <p>
        does not exist. Please use the "back" button on your browser to return
        to where you were, or start again using the links in the menu bar.
      </p>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
h4 {
  margin-left: 2rem;
}
</style>
