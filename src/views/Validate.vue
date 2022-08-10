<template>
  <div class="validate">
    <h1>Validate CellML models</h1>
    <p>
      This service will accept CellML 2.0 files and check for syntactic validity
      against the
      <a href="https://www.cellml.org/specifications/cellml_2.0" target="_blank"
        >CellML Normative Specification</a
      >
    </p>
    <v-container>
      <v-file-input
        v-model="modelFile"
        show-size
        truncate-length="64"
        label="Upload model"
      >
        ></v-file-input
      >
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col class="col-12 col-md-4" id="validateButton">
          <v-btn
            block
            :class="'big-button'"
            :disabled="ableToValidate"
            v-on:click="readFile"
          >
            <v-icon color="white" x-large>mdi-file-check-outline</v-icon><br />
            Validate CellML 2.0 syntax
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="parserFoundErrors">
      <issue-heading :title="validatedModel"></issue-heading>
      <issue-card
        v-for="(issue, j) in issueData"
        :key="'parser_issue_' + j"
        :issue="issue"
        @dismiss="removeMessage(j)"
      ></issue-card>
    </v-container>
    <v-container v-else-if="validatorFoundErrors">
      <issue-heading :title="validatedModel" issueSource="Validation"></issue-heading>
      <issue-card
        v-for="(issue, j) in issueData"
        :key="'validation_issue_' + j"
        :issue="issue"
        :onLearnButton="true"
        @dismiss="removeMessage(j)"
      ></issue-card>
    </v-container>

    <v-container
      v-else-if="!parserFoundErrors && !validatorFoundErrors && validatedModel"
    >
      <v-card class="noErrors" elevation="0">
        <v-card-title>
          <v-icon large>mdi-check-bold</v-icon>
          <span style="padding-right: 0.5em; font-weight: 600"
            >{{ validatedModel }}:</span
          >
          <span>The model is valid!</span>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useStore } from 'vuex'

import IssueCard from '../components/IssueCard.vue'
import IssueHeading from '../components/IssueHeading.vue'

import { onLearnMoreClicked } from '../js/utilities'

const store = useStore()

const libcellml = ref(null)
const issueData = ref([])
const modelFile = ref([])
const validatorFoundErrors = ref(false)
const errorsFound = ref(false)
const parserFoundErrors = ref(false)
const validatedModel = ref('')

libcellml.value = inject('$libcellml')

const ableToValidate = computed(() => {
  return libcellml.value !== null && modelFile.value.length > 0
    ? undefined
    : true
})

function removeMessage(index) {
  issueData.value.splice(index, 1)
}

function validate(cellmlString) {
  let parser = new libcellml.value.Parser()
  let validator = new libcellml.value.Validator()
  let model = null
  try {
    model = parser.parseModel(cellmlString, false)
  } catch (err) {
    parser.delete()
    validator.delete()

    return {
      issues: [
        {
          description:
            'Error encountered while parsing file.  Error: ' + err.message,
        },
      ],
      type: 'parser',
    }
  }

  let errors = []
  let i = 0

  if (parser.errorCount()) {
    while (i < parser.errorCount()) {
      let e = parser.error(i)
      errors.push({
        description: e.description(),
      })
      e.delete()
      i++
    }
    parser.delete()
    validator.delete()
    model.delete()

    return { issues: errors, type: 'parser' }
  }

  i = 0
  validator.validateModel(model)
  while (i < validator.errorCount()) {
    let e = validator.error(i)
    errors.push({
      description: e.description(),
      ref: e.referenceHeading(),
      url: e.url(),
    })
    e.delete()
    i++
  }

  errorsFound.value = errors.length > 0

  parser.delete()
  validator.delete()
  model.delete()

  return { issues: errors, type: 'validator' }
}

function clearData() {
  errorsFound.value = false
  validatorFoundErrors.value = false
  validatedModel.value = ''
  issueData.value = []
}

function readFile() {
  clearData()

  const reader = new FileReader()

  reader.readAsText(modelFile.value[0], 'UTF-8')

  reader.onload = function (evt) {
    try {
      let results = validate(evt.target.result)
      validatedModel.value = modelFile.value[0].name
      issueData.value = results.issues
      validatorFoundErrors.value = results.type === 'validator'
      parserFoundErrors.value = results.type === 'parser'
    } catch (err) {
      store.dispatch('notifications/add', {
        type: 'error',
        title: `File read error:`,
        message: 'Could not validate file: ' + err.message,
      })
    }
  }

  reader.onerror = function (evt) {
    store.dispatch('notifications/add', {
      type: 'error',
      title: `File read error:`,
      message: modelFile.name,
    })
  }
}
</script>

<style scoped>
.loading {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.v-card {
  margin-top: 1em;
}

.noErrors {
  background-color: var(--very-pale-green);
  color: var(--dark-green);
}

.noErrors .v-icon {
  color: var(--mid-green);
  padding-right: 1em;
}

.errors {
  background-color: var(--very-pale-red);
  color: var(--dark-red);
}

.errors .v_card__text {
  color: var(--dark-red) !important;
}

.errors .v-icon {
  /* color: red--text; */
  padding-right: 1em;
}
</style>
