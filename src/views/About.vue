<template>
  <v-row>
    <v-col cols="12" id="about" class="about-section">
      <about-content />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <version-content />
    </v-col>
  </v-row>
</template>

<script setup>
import AboutContent from '../components/home/AboutContent.vue'
import VersionContent from '../components/VersionContent.vue';
</script>
