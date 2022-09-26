<template>
  <v-card elevation="0" outlined>
    <v-card-title>{{ issue.type }}</v-card-title>
    <v-card-subtitle v-if="issue.ref"
      ><strong>Specification section: </strong> {{ issue.ref }}</v-card-subtitle
    >
    <v-card-text>{{ issue.description }} {{ issue.url }}</v-card-text>
    <v-card-actions>
      <v-btn
        left
        text
        light
        @click="onLearnMoreClicked(issue.url)"
        color="primary"
        >Learn more</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn right text color="warning" @click="onDismiss">Dismiss</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { onLearnMoreClicked } from '../js/utilities'

const emit = defineEmits(['dismiss'])

const props = defineProps({
  issue: {
    type: Object,
    required: true,
  },
  learnMoreButton: {
    type: Boolean,
    default: false,
  },
})

const onDismiss = () => {
  emit('dismiss')
}
</script>
