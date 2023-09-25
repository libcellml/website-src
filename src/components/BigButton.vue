<template>
  <v-btn block class="big-button" :to="target">
    <v-icon color="white" x-large>{{ iconName }}</v-icon>
    <small-spacer />
    {{ label }}
  </v-btn>
</template>

<script setup>
import SmallSpacer from './SmallSpacer.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
})
</script>