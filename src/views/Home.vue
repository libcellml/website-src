<template>
  <v-row>
    <v-col cols="12" id="intro" class="home-section">
      <intro-content />
    </v-col>
    <v-col cols="12" id="download" class="home-section">
      <download-content />
    </v-col>
    <v-col cols="12" id="documentation" class="home-section">
      <h1>Documentation</h1>
      <documentation-buttons />
      <documentation-blurb />
    </v-col>
    <v-col cols="12" id="services" class="home-section">
      <h1>Services</h1>
      <services-buttons />
      <services-blurb />
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
import DocumentationButtons from '../components/DocumentationButtons.vue'
import DocumentationBlurb from '../components/DocumentationBlurb.vue'
import ServicesButtons from '../components/ServicesButtons.vue'
import ServicesBlurb from '../components/ServicesBlurb.vue'
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
