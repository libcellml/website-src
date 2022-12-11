<template>
  <div>
    <h3>Website version information</h3>
    <p>
      The build identifier for the website is <strong id="about-website-build-identifier">{{ getWebsiteBuild() }}</strong>.
    </p>
    <p>
      The revision this website was created from is <strong id="about-website-build-revision">{{ getWebsiteRevision() }}</strong>.
    </p>
  </div>
</template>

<script setup>
import { getWebsiteBuild, getWebsiteRevision } from '@/js/websiteversions'
</script>
