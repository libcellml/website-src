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
          <DocumentationSummary />
          <DocumentationLink />
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
import DownloadSummary from '@/components/DownloadSummary'
import DownloadLink from '@/components/DownloadLink'
import DocumentationSummary from '@/components/DocumentationSummary'
import DocumentationLink from '@/components/DocumentationLink'
import IntroContent from '@/components/IntroContent'

export default {
  name: 'Home',
  components: {
    AboutContent,
    DownloadSummary,
    DownloadLink,
    DocumentationSummary,
    DocumentationLink,
    IntroContent,
  },
}
</script>

<style src="../css/general.css"></style>
