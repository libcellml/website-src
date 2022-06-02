<template>
  <v-row>
    <v-col>
      <h1>Users' Guides</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col col="12" md="4" id="install">
      <v-tooltip anchor="bottom" open-delay="200">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            v-bind="props"
            :class="'big-button'"
            :to="getToPath('installation')"
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

    <v-col col="12" md="4" id="tutorials">
      <v-tooltip anchor="bottom" open-delay="200">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            v-bind="props"
            :class="'big-button'"
            :to="getToPath('tutorials')"
          >
            <v-icon color="white" x-large>mdi-school</v-icon><br />
            TUTORIALS
          </v-btn>
        </template>
        <span>
          A collection of tutorials demonstrating in context how libCellML can
          be used to create, manipulate, validate, and solve CellML models.
        </span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="howto">
      <v-tooltip anchor="bottom" open-delay="200">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            v-bind="props"
            :class="'big-button'"
            :to="getToPath('howto')"
          >
            <!-- <v-icon color="white" x-large>mdi-human-male-board</v-icon><br /> -->
            <v-icon color="white" x-large
              >mdi-account-box-multiple-outline</v-icon
            ><br />
            HOW TO
          </v-btn>
        </template>
        <span> A list of useful code examples showing specific actions. </span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="profiles">
      <v-tooltip anchor="bottom" open-delay="200">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            v-bind="props"
            :class="'big-button'"
            :to="getToPath('common_users')"
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

    <v-col col="12" md="4" id="issues">
      <v-tooltip anchor="bottom" open-delay="200">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            v-bind="props"
            :class="'big-button'"
            :to="getToPath('runtime_codes')"
          >
            <v-icon color="white" x-large>mdi-clipboard-text-play</v-icon><br />
            RUN-TIME CODES
          </v-btn>
        </template>
        <span>
          A collection of codes returned during run-time and their
          interpretation.
        </span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="asides">
      <v-tooltip anchor="bottom" open-delay="200">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            v-bind="props"
            :class="'big-button'"
            :to="getToPath('asides')"
          >
            <v-icon color="white" x-large>mdi-information</v-icon><br />
            GENERAL INFORMATION
          </v-btn>
        </template>
        <span>
          General information about special functionality and best practice.
        </span>
      </v-tooltip>
    </v-col>
  </v-row>

  <div class="notes">
    <br />
    <p>
      This links above provide installation instructions, tutorials, code
      examples, user guides for the most common use cases, and general
      discussions and information about the CellML model structure itself. The
      following resource might be helpful too:
    </p>
    <ul>
      <li>
        <a
          href="https://www.cellml.org/specifications/cellml_2.0"
          target="_blank"
          >CellML 2.0 Normative Specification</a
        >
        The official specification of the CellML language. Note that this also
        contains informative sections, CellML code examples, and thoughts about
        the structure of CellML models.
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

function getToPath(subpath) {
  return `/documentation/${store.state.current_documentation_version}/userguides/${subpath}/index`
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
