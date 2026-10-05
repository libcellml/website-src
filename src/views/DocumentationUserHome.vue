<template>
  <v-row>
    <v-col>
      <h1>Users' Guides</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col col="12" md="4" id="install">
      <v-tooltip
        anchor="bottom"
        open-delay="200"
        :aria-label="tooltips.installation"
      >
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
        <span>{{ tooltips.installation }}</span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="tutorials">
      <v-tooltip
        anchor="bottom"
        open-delay="200"
        :aria-label="tooltips.tutorials"
      >
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
        <span>{{ tooltips.tutorials }}</span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="howto">
      <v-tooltip
        anchor="bottom"
        open-delay="200"
        :aria-label="tooltips.howto"
      >
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
        <span>{{ tooltips.howto }}</span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="profiles">
      <v-tooltip
        anchor="bottom"
        open-delay="200"
        :aria-label="tooltips.common_users"
      >
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
        <span>{{ tooltips.common_users }}</span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="issues">
      <v-tooltip
        anchor="bottom"
        open-delay="200"
        :aria-label="tooltips.runtime_codes"
      >
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
        <span>{{ tooltips.runtime_codes }}</span>
      </v-tooltip>
    </v-col>

    <v-col col="12" md="4" id="asides">
      <v-tooltip
        anchor="bottom"
        open-delay="200"
        :aria-label="tooltips.asides"
      >
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
        <span>{{ tooltips.asides }}</span>
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
  <v-row>
    <v-col>
      <h1>Validation Provenance</h1>
      <p v-if="validationProvenanceIsKnown">
        This documentation was validated with
        <a :href="framework_url" target="_blank"> {{ framework_ref }}</a>
        of the testing framework and
        <a :href="database_url" target="_blank"> {{ database_ref }}</a>
        of the test database.
      </p>
      <p v-else>
        There is no known validation of this documentation with the libCellML
        library.
      </p>
      <p v-if="neverTrue"></p>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSiteStore } from '@/stores/site'

const store = useSiteStore()

// Shown in each button's tooltip, and also given to the tooltip as its
// accessible name.
const tooltips = {
  installation:
    'Information on installing libCellML, and testing your installation.',
  tutorials:
    'A collection of tutorials demonstrating in context how libCellML can be used to create, manipulate, validate, and solve CellML models.',
  howto:
    'A list of useful code examples showing specific actions.',
  common_users:
    'A collection of code snippets arranged according to the requirements of different user groups.',
  runtime_codes:
    'A collection of codes returned during run-time and their interpretation.',
  asides:
    'General information about special functionality and best practice.',
}

const validationProvenance = ref(defaultValidationProvenance())

const framework_url = computed(() => {
  return `https://github.com/${validationProvenance.value.testing_framework.project}/tree/${validationProvenance.value.testing_framework.reference}`
})
const database_url = computed(() => {
  return `https://github.com/${validationProvenance.value.testing_database.project}/tree/${validationProvenance.value.testing_database.reference}`
})
const framework_ref = computed(() => {
  return validationProvenance.value.testing_framework.reference
})
const database_ref = computed(() => {
  return validationProvenance.value.testing_database.reference
})

const neverTrue = computed(() => {
  const url = `/generated/${store.current_documentation_version}/user/validation_provenance.json`
  fetch(url).then((response) => {
    response.json().then(
      (content) => {
        validationProvenance.value = content
      },
      () => {
        validationProvenance.value = defaultValidationProvenance()
      }
    )
  })
  return false
})

const validationProvenanceIsKnown = computed(() => {
  return (
    validationProvenance.value.testing_framework.reference !== 'unknown' &&
    validationProvenance.value.testing_database.reference !== 'unknown'
  )
})

function getToPath(subpath) {
  return `/documentation/${store.current_documentation_version}/user/${subpath}/index`
}

function defaultValidationProvenance() {
  return {
    testing_framework: { reference: 'unknown', project: 'unknown' },
    testing_database: { reference: 'unknown', project: 'unknown' },
  }
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
