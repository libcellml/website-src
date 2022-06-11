<template>
  <v-row>
    <v-col>
      <h1>Oops!</h1>
      <BrokenLink />
      <br />
      <router-link to="/">Back to the home page</router-link>
    </v-col>
  </v-row>
</template>

<script setup>
import BrokenLink from '../components/BrokenLink.vue'
</script>
