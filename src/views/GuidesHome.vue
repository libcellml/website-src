<template>
  <v-container>
    <v-row>
      <v-col>
        <BreadCrumbs
          v-bind:versionChoices="getVersions()"
          :currentVersion="`${$route.params.version}`"
          :versionType="'guides'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>libCellML Users' Guides</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3" id="install">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              block
              v-on="on"
              :class="'big-button'"
              :to="getInstallationPath"
            >
              <v-icon color="white" x-large>mdi-cogs</v-icon><br />
              INSTALLATION
            </v-btn>
          </template>
          <span>
            Information on installing libCellML, and testing your installation.
          </span>
        </v-tooltip>
      </v-col>

      <v-col class="col-12 col-md-3" id="tutorials">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn block v-on="on" :class="'big-button'" :to="getTutorialsPath">
              <v-icon color="white" x-large>mdi-school</v-icon><br />
              TUTORIALS
            </v-btn>
          </template>
          <span>
            A collection of tutorials demonstrating in context how libCellML can
            be used to create, manipulate, and solve models CellML models.
          </span>
        </v-tooltip>
      </v-col>

      <v-col class="col-12 col-md-3" id="howto">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn block v-on="on" :class="'big-button'" :to="getHowtoPath">
              <v-icon color="white" x-large>mdi-teach</v-icon><br />
              HOW TO
            </v-btn>
          </template>
          <span>
            A list of useful code examples showing specific actions.
          </span>
        </v-tooltip>
      </v-col>

      <v-col class="col-12 col-md-3" id="profiles">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              block
              v-on="on"
              :class="'big-button'"
              :to="getUserScenariosPath"
            >
              <v-icon color="white" x-large>mdi-account-group</v-icon><br />
              USAGE SCENARIOS
            </v-btn>
          </template>
          <span>
            A collection of code snippets arranged according to the requirements
            of different user groups.
          </span>
        </v-tooltip>
      </v-col>
    </v-row>

    <div class="notes">
      <br />
      <p>
        This links above provide installation instructions, tutorials, code
        examples, and user guides for the most common use cases.
        For general discussions and information about the CellML model
        structure itself, the following resources might be helpful too:
      </p>
      <ul>
        <li>
          <a>Notes on CellML structure</a> A small collection of pages including
          background information on how certain CellML elements have been
          designed to function.
        </li>
        <li>
          <a>CellML 2.0 Normative Specification</a>
          The official specification of the CellML language. Note that this also
          contains informative sections, CellML code examples, and thoughts
          about the structure of CellML models.
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
// import { SphinxPage } from 'vue-sphinx-xml'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getUserGuidesVersions } from '../js/versions'

import ui from '@/js/ui'

export default {
  name: 'GuidesHome',
  components: {
    // SphinxPage,
    BreadCrumbs,
  },
  computed: {
    versionPath() {
      return this.$route.params.version
    },
    getInstallationPath() {
      return (
        '/documentation/guides/' +
        this.$route.params.version +
        '/installation/index'
      )
    },
    getTutorialsPath() {
      return (
        '/documentation/guides/' +
        this.$route.params.version +
        '/tutorials/index'
      )
    },
    getHowtoPath() {
      return (
        '/documentation/guides/' + this.$route.params.version + '/howto/index'
      )
    },
    getUserScenariosPath() {
      return (
        '/documentation/guides/' +
        this.$route.params.version +
        '/common_users/index'
      )
    },
  },

  methods: {
    getVersions() {
      return getUserGuidesVersions()
    },

    updated() {
      this.$store.commit('togglePageContentChanged')

      // KRM include these on any page where the injected XML might contain tabs or toggle blocks.
      // Workaround only until sphinx tabs and toggles cann be handled outside the browser properly.
      setTimeout(function () {
        ui.processSphinxTabs()
        ui.addClickHandlerTabs()
        ui.addClickHandlerToggles()
      }, this.$store.getters.getTransitionDelay)
    },
  },
}
</script>

<style scoped>
.api-reference {
  position: relative;
}
.version-box > * {
  position: relative;
  margin: 0;
  padding: 0;
}
.v-tooltip__content {
  opacity: 1 !important;
  max-width: 30em;
  background-color: var(--mid-grey);
}
.notes {
  padding: 1em;
}
</style>
<style src="../css/sphinx.css"></style>
