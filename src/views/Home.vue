<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" id="intro" class="home-section">
          <IntroContent />
        </v-col>
        <v-col cols="12" id="download" class="home-section">
          <DownloadSummary />
          <DownloadLink />
        </v-col>
        <v-col cols="12" id="documentation" class="home-section">
          <DocumentationSummary />
          <DocumentationLink />
        </v-col>
        <v-col cols="12" id="services" class="home-section">
          <services-landing-page-section />
        </v-col>
        <v-col cols="12" id="about" class="home-section">
          <AboutContent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AboutContent from '@/components/AboutContent'
import DownloadSummary from '@/components/DownloadSummary'
import DownloadLink from '@/components/DownloadLink'
import DocumentationSummary from '@/components/DocumentationSummary'
import DocumentationLink from '@/components/DocumentationLink'
import IntroContent from '@/components/IntroContent'
import ServicesLandingPageSection from '../components/ServicesLandingPageSection.vue'

export default {
  name: 'Home',
  components: {
    AboutContent,
    DownloadSummary,
    DownloadLink,
    DocumentationSummary,
    DocumentationLink,
    IntroContent,
    ServicesLandingPageSection,
  },
}
</script>

<style>
.home-section {
  min-height: 100vh;
}
</style>
