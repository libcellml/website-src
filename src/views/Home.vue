<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" id="intro">
          <IntroContent />
        </v-col>
        <v-col cols="12" id="download">
          <DownloadSummary />
          <DownloadLink />
        </v-col>
        <v-col cols="12" id="documentation">
          <DocumentationContent />
        </v-col>
        <v-col cols="12" id="developers">
          <DevelopersContent />
        </v-col>
        <v-col cols="12" id="about">
          <AboutContent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AboutContent from '@/components/AboutContent'
import DevelopersContent from '@/components/DevelopersContent'
import DownloadSummary from '@/components/DownloadSummary'
import DownloadLink from '@/components/DownloadLink'
import DocumentationContent from '@/components/DocumentationContent'
import IntroContent from '@/components/IntroContent'

export default {
  name: 'Home',
  components: {
    AboutContent,
    DevelopersContent,
    DownloadSummary,
    DownloadLink,
    DocumentationContent,
    IntroContent,
  },
}
</script>

<style src="../css/general.css"></style>
