<template>
  <div id="aboutContent" class="about">
    <h1>About libCellML</h1>
    <h3>Questions and comments</h3>
    <p>
      The library is designed to be used for working with CellML models. For
      questions, feature requests, and bug reports about the libCellML library,
      please visit the
      <a href="https://github.com/cellml/libcellml/issues" target="_blank"
        >libCellML GitHub repository</a
      >.
    </p>
    <p>
      For problems with this website, please visit the
      <a href="https://github.com/libcellml/website-src/issues" target="_blank"
        >website GitHub repository</a
      >.
    </p>

    <h3>Citing libCellML</h3>
    <p>
      Until we have a formal paper to cite, please link to the official
      libCellML website
      <a href="http://www.libcellml.org" target="_blank">libcellml.org</a>
      and reference the CellML 2.0 paper below:
    </p>
    <p style="padding-left: 1.5em">
      Michael Clerx, Michael T. Cooling, Jonathan Cooper, Alan Garny, Keri
      Moyle, David P. Nickerson, Poul M. F. Nielsen, and Hugh Sorby (2020),
      "CellML 2.0", <i>Journal of Integrative Bioinformatics</i>, <b>17</b>:2-3.
      <br />
      <b>DOI: </b>
      <a href="https://doi.org/10.1515/jib-2020-0021" target="_blank"
        >https://doi.org/10.1515/jib-2020-0021</a
      >
    </p>

    <h2 id="acknowledgements">Acknowledgements</h2>

    <h3>Contributors</h3>
    <p>
      Contributors to the
      <a
        href="https://github.com/cellml/libcellml/graphs/contributors"
        target="_blank"
      >
        libCellML Github repository</a
      >,
      <a
        href="https://github.com/libcellml/website-src/graphs/contributors"
        target="_blank"
      >
        this website</a
      >, and
      <a
        href="https://github.com/kerimoyle/libcellml-tutorials/graphs/contributors"
        target="_blank"
      >
        our documentation</a
      >
      are shown below (in an actively randomised order):
    </p>

    <github-contributors />

    <h3>Supporters</h3>
    The libCellML team acknowledges the generous support of our sponsors:

    <v-container class="image-box">
      <v-row>
        <v-col class="col-12 col-sm-6 col-md-4">
          <img src="../../assets/logo_medtech_core.png" />
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <img src="../../assets/logo_maurice_wilkins.png" />
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <img src="../../assets/logo_vpr.png" />
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <img src="../../assets/logo_abi.png" />
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <img src="../../assets/logo_aotearoa.png" />
        </v-col>
      </v-row>
    </v-container>
    <h3>License</h3>
    <p>
      This work is licensed under a
      <a
        rel="license"
        href="http://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        >Creative Commons Attribution 4.0 International License</a
      >.
    </p>
    <h3>libcellml.js</h3>
    <p>
      The version of
      <a
        rel="external"
        href="https://www.npmjs.com/package/libcellml.js"
        target="_blank"
        >libcellml.js</a
      >
      that this website is using is:
      {{ libcellmlVersionString }}
    </p>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'

import GithubContributors from '../GithubContributors.vue'

const libcellml = ref(null)
libcellml.value = inject('$libcellml')

const libcellmlVersionString = computed(() => {
  if (libcellml.value.state === 'loading') {
    return '[loading libcellml ...]'
  }

  return libcellml.value.module === undefined
    ? '<unavailable>'
    : libcellml.value.module.versionString()
})
</script>
