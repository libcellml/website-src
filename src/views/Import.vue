<template>
  <div class="import">
    <h1>Import CellML models</h1>
    <p>
      This service will accept CellML 1.0 or CellML 1.1 files and import them
      into CellML 2.0 by parsing them using libCellML in permissive mode.
    </p>
    <v-container>
      <v-file-input
        id="import-file-input"
        v-model="modelFile"
        show-size
        truncate-length="64"
        label="Upload model"
      >
        ></v-file-input
      >
    </v-container>
    <v-container>
      <v-row v-if="!versionSupports1XImport" justify="center">
        <v-col>
          <v-alert type="error"
            >Importing of CellML 1.0/1.1 models is not supported with this
            version of libCellML.js</v-alert
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-12 col-md-4" id="importButton">
          <v-btn
            block
            :class="'big-button'"
            :disabled="!ableToImportModel"
            v-on:click="readFile"
          >
            <v-icon color="white" x-large>mdi-file-import</v-icon><br />
            Import CellML 1.0/1.1 model
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-card class="mx-auto">
        <v-list rounded>
          <v-list-subheader
            >Imported models<v-spacer /><v-btn
              class="import-clear-btn"
              :disabled="downloads.length === 0"
              @click="clearDownloads()"
              >clear</v-btn
            ></v-list-subheader
          >
          <v-tooltip bottom v-for="(item, i) in downloads" :key="i">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                @click="downloadFile(item)"
                :disabled="item.pending"
                :prepend-icon="item.pending ? 'mdi-loading' : 'mdi-download'"
                :title="downloadFileTitle(item)"
              >
              </v-list-item>
            </template>
            <span>Download</span>
          </v-tooltip>
        </v-list>
      </v-card>
    </v-container>

    <v-container v-if="parserFoundErrors">
      <issue-heading :title="modelFile[0].name"></issue-heading>
      <issue-card
        v-for="(issue, j) in issueData"
        :key="j"
        :issue="issue"
        @dismiss="removeMessage(j)"
      ></issue-card>
    </v-container>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import semver from 'semver'

import { useNotificationsStore } from '@/stores/notifications'
import IssueHeading from '../components/IssueHeading.vue'
import IssueCard from '../components/IssueCard.vue'

import { downloadFile, downloadFileTitle } from '../js/utilities'

const store = useNotificationsStore()

const issueData = ref([])
const modelFile = ref([])
const parserFoundErrors = ref(false)
const downloads = ref([])

const libcellml = inject('$libcellml')

const versionSupports1XImport = computed(() => {
  if (libcellml.state === 'ready') {
    return semver.gte(libcellml.module.versionString(), '0.4.0')
  }

  return false
})

const ableToImportModel = computed(() => {
  if (libcellml.state === 'ready') {
    if (!versionSupports1XImport.value) {
      return false
    }
    return modelFile.value.length > 0
  }

  return false
})

function removeMessage(index) {
  issueData.value.splice(index, 1)
}

function importModel(cellmlString) {
  let parser = new libcellml.module.Parser(false)
  let printer = new libcellml.module.Printer()
  let model = null
  try {
    model = parser.parseModel(cellmlString)
  } catch (err) {
    parser.delete()
    printer.delete()

    return {
      issues: [
        {
          description: 'Failed to parse model.  Reason:' + err.message,
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
    printer.delete()
    model.delete()

    return { issues: errors, type: 'parser' }
  }

  const printedModel = printer.printModel(model, false)

  downloads.value.push({
    name: modelFile.value[0].name,
    data: printedModel,
    type: 'text/xml',
    pending: false,
  })

  parser.delete()
  printer.delete()
  model.delete()

  return { issues: errors, type: 'not-set' }
}

function clearData() {
  issueData.value = []
}

function clearDownloads() {
  downloads.value = []
}

function readFile() {
  clearData()

  const reader = new FileReader()

  reader.readAsText(modelFile.value[0], 'UTF-8')

  reader.onload = function (evt) {
    try {
      let results = importModel(evt.target.result)
      issueData.value = results.issues
      parserFoundErrors.value = Boolean(
        results.type === 'parser' && results.issues.length
      )
    } catch (err) {
      store.add({
        type: 'error',
        title: `File read error:`,
        message: 'Could not validate file: ' + err.message,
      })
    }
  }

  reader.onerror = function (evt) {
    store.add({
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

.import-clear-btn {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
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
