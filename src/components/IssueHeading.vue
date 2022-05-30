<template>
  <v-card class="red darken-1 errors" elevation="0">
    <v-card-title>
      <v-icon large>mdi-alert-circle</v-icon>
      <span style="padding-right: 1em; font-weight: 600">{{ title }}:</span>
      <span>{{ issueSource }} errors were found!</span>
    </v-card-title>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  issueSource: {
    type: String,
    default: 'Parser',
  },
})
</script>
