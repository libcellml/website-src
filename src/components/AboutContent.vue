<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About libCellML</h1>

        <h3>Questions and comments</h3>
        <p>
          The library is intended to be lightweight and focused purely in
          dealing with CellML models. In achieving this, some of the convenience
          methods/objects that we might expect will not be part of libCellML.
          For questions, feature requests, and bug reports about the libCellML
          library, please visit the
          <a href="https://github.com/cellml/libcellml/issues" target="_blank"
            >libCellML GitHub repository</a
          >.
        </p>
        <p>
          For problems with this website, please visit the
          <a
            href="https://github.com/libcellml/website-src/issues"
            target="_blank"
            >website GitHub repository</a
          >.
        </p>

        <h3>Citing libCellML</h3>
        <p>
          Until we have a formal paper to cite, please link to the official
          libCellML website
          <a target="_blank" href="http://www.libcellml.org"
            >www.libcellml.org</a
          >
          and reference the CellML 2.0 paper below:
        </p>
        <p style="padding-left: 1.5em">
          Michael Clerx, Michael T. Cooling, Jonathan Cooper, Alan Garny, Keri
          Moyle, David P. Nickerson, Poul M. F. Nielsen, and Hugh Sorby (2020),
          "CellML 2.0", <i>Journal of Integrative Bioinformatics</i>,
          <b>17</b>:2-3
          <br />
          <b>DOI: </b>
          <a href="https://doi.org/10.1515/jib-2020-0021"
            >https://doi.org/10.1515/jib-2020-0021</a
          >
        </p>

        <h3>Contributors</h3>
        <p>
          Contributors to the 
          <a href="https://github.com/cellml/libcellml/graphs/contributors">
          libCellML Github repository</a>, 
          <a href="https://github.com/libcellml/website-src/graphs/contributors">
          this website</a>, and <a href="https://github.com/kerimoyle/libcellml-tutorials/graphs/contributors">
          our documentation</a> are shown below.
        </p>

        <GithubContributors />

        <h3>Supporters</h3>
        The libCellML team acknowledges the generous support of our sponsors.

        <v-container class="image-box">
          <v-row>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_medtech_core.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_maurice_wilkins.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_vpr.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_abi.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_aotearoa.png" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GithubContributors from './GithubContributors'

export default {
  name: 'AboutContent',
  components: { GithubContributors },
}
</script>
