<template>
  <v-row>
    <v-col cols="12" id="intro" class="home-section">
      <intro-content />
    </v-col>
    <v-col cols="12" id="download" class="home-section">
      <download-content />
    </v-col>
    <v-col cols="12" id="documentation" class="home-section">
      <documentation-content />
    </v-col>
    <v-col cols="12" id="services" class="home-section">
      <services-content />
    </v-col>
    <v-col cols="12" id="about" class="home-section">
      <about-content />
    </v-col>
  </v-row>
</template>

<script setup>
import IntroContent from '../components/home/IntroContent.vue'
import AboutContent from '../components/home/AboutContent.vue'
import DownloadContent from '../components/home/DownloadContent.vue'
import DocumentationContent from '../components/home/DocumentationContent.vue'
import ServicesContent from '../components/home/ServicesContent.vue'
</script>

<style scoped>
.home-section {
  min-height: 50vh;
}
.a-home-section:nth-of-type(odd) {
  background: linear-gradient(90deg, pink 50%, cyan 50%);
}
.a-home-section:nth-of-type(even) {
  background-color: white;
}
</style>
