<template>
  <v-tooltip anchor="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        plain
        v-bind="props"
        href="https://github.com/libcellml/website-src/issues/new"
        target="_blank"
        class="bug-button"
        @mouseover="onEnter"
        @mouseleave="onLeave"
      >
        <v-icon class="buggy">mdi-bug</v-icon>
        <span :class="{ 'bug-text': true, hover }"></span>
      </v-btn>
    </template>
    <span
      >This website is a work in progress. Some parts have bugs <br />and others
      have outright infestations. We are working to fix these<br />
      issues but feel free to add an issue at <br />
      https://github.com/libcellml/website-src.<br /><br />
      <strong>Click me!</strong> if you want to add an issue right now!</span
    >
  </v-tooltip>
</template>

<script setup>
import { ref } from 'vue'

const hover = ref(false)

function onEnter() {
  hover.value = true
}

function onLeave() {
  hover.value = false
}

</script>

<style scoped>
.bug-button {
  margin-left: auto;
}

.buggy {
  /* margin-left: 3em; */
  font-size: 2.3em !important;
  color: yellowgreen !important;
}

.v-btn__content {
  opacity: 1 !important;
}

span.bug-text {
  font-size: 0em;
  min-width: 7em;
}

span.bug-text {
  font-size: 1.3em;
  min-width: 7em;
}

span.bug-text::after {
  content: 'Hover me!';
}

span.bug-text.hover::after {
  content: 'Click me!';
}
</style>
