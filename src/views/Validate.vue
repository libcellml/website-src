<template>
  <div class="validate">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs />
          <h1>Validate CellML models</h1>
          <p>
            This service will accept CellML 2.0 files and check for syntactic
            validity against the
            <a
              href="https://www.cellml.org/specifications/cellml_2.0"
              target="_blank"
              >CellML Normative Specification</a
            >
          </p>
          <v-container>
            <v-file-input
              v-model="file"
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
                  v-on:click="readFile"
                  v-if="file !== null"
                >
                  <v-icon color="white" x-large>mdi-file-check-outline</v-icon
                  ><br />
                  Validate CellML 2.0 syntax
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <v-container v-if="parserHasErrors">
            <v-card class="errors" elevation="0">
              <v-card-title>
                <v-icon large>mdi-alert-circle</v-icon>
                <span style="padding-right: 1em; font-weight: 600"
                  >{{ file.name }}:</span
                >
                <span
                  >Parser errors were found!</span
                >
              </v-card-title>
            </v-card>

            <v-card
              v-for="(issue, j) in getIssues"
              :key="j"
              elevation="0"
              outlined
            >
              <v-card-text>{{ issue.description }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn right text light @click="removeMessage(j)"
                  >Dismiss</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-container>

          <v-container v-else>
            <v-card
              v-if="fileIsTested && !hasErrors"
              class="noErrors"
              elevation="0"
            >
              <v-card-title>
                <v-icon large>mdi-check-bold</v-icon>
                <span style="padding-right: 0.5em; font-weight: 600"
                  >{{ file.name }}:</span
                >
                <span>The model is valid!</span>
              </v-card-title>
            </v-card>
            <v-card
              v-if="fileIsTested && hasErrors"
              class="errors"
              elevation="0"
            >
              <v-card-title>
                <v-icon large>mdi-alert-circle</v-icon>
                <span style="padding-right: 0.5em; font-weight: 600"
                  >{{ file.name }}:</span
                >
                <span>Validation errors were found</span>
              </v-card-title>
            </v-card>

            <v-card
              v-for="(issue, j) in getIssues"
              :key="j"
              elevation="0"
              outlined
            >
              <!-- <v-card-title>{{ issue.type }}</v-card-title> -->
              <!-- TODO: Remove until libcellml.js bindings have been updated -->
              <!-- <v-card-subtitle v-if="issue.ref"
                ><strong>Specification section:</strong>
                {{ issue.ref }}</v-card-subtitle
              > -->
              <v-card-text>{{ issue.description }}</v-card-text>
              <v-card-actions>
                <!-- TODO: Remove until libcellml.js bindings to URL have been updated -->
                <!-- <v-btn
                  v-if="issue.url"
                  left
                  text
                  :href="issue.url"
                  target="_blank"
                  >Learn more</v-btn
                > -->
                <v-spacer></v-spacer>
                <v-btn right text light @click="removeMessage(j)"
                  >Dismiss</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BreadCrumbs from '@/components/BreadCrumbs'

// TODO: This should be updated to the "latest" version when drafting is merged with production in the spec.
const baseSpecificationUrl =
  'https://cellml-specification.readthedocs.io/en/cellml-2-drafting/reference/formal_and_informative/'

export default {
  name: 'Validate',
  components: {
    BreadCrumbs,
  },
  data: function () {
    return {
      isTested: false,
      errorsFound: false,
      parserErrorsFound: false,
      file: null,
      issueData: [],
    }
  },
  computed: {
    getIssues() {
      return this.$data.issueData
    },
    getFileName() {
      return this.$data.file === null ? '' : this.$data.file.name
    },
    fileIsTested() {
      return this.$data.isTested
    },
    hasErrors() {
      return this.$data.errorsFound
    },
    fileChanged() {
      return this.$data.file
    },
    parserHasErrors() {
      return this.$data.parserErrorsFound
    },
  },
  watch: {
    fileChanged() {
      this.clearData()
    },
  },
  methods: {
    removeMessage(index) {
      this.$delete(this.getIssues, index)
    },
    // TODO: This shouldn't be needed.  It would be much better to return the correct URL directly
    // from the libcellml.js binding.
    // getUrl(ref) {
    //   let url = ''
    //   try {
    //     const section = { 1: 'specA', 2: 'specB', 3: 'specC' }
    //     let splitRef = ref.split('.')
    //     let page = section[splitRef[0]]
    //     if (page === undefined) {
    //       return ''
    //     }
    //     let para = splitRef[1].padStart(2, '0')
    //     url = baseSpecificationUrl + page + para + '.html?issue=' + ref
    //   } catch {
    //     // Do nothing
    //   }
    //   return url
    // },

    validate(cellmlString) {
      let parser = new this.$libcellml.Parser()
      let validator = new this.$libcellml.Validator()
      let model = null
      try {
        model = parser.parseModel(cellmlString)
      } catch (err) {
        this.$data.parserErrorsFound = true
        return {
          issues: [
            {
              description:
                'At present, CellML files containing Units cannot be read.  ' +
                err.message,
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
          i++
        }
        this.$data.parserErrorsFound = true
        return { issues: errors, type: 'parser' }
      }

      i = 0
      validator.validateModel(model)
      while (i < validator.errorCount()) {
        let e = validator.error(i)
        // let ref = e.referenceHeading()
        errors.push({
          description: e.description(),
          // ref: ref,
          // url: this.getUrl(ref),
        })
        i++
      }

      if (errors.length > 0) {
        this.$data.errorsFound = true
      } else {
        this.$data.errorsFound = false
      }
      return { issues: errors, type: 'validator' }
    },

    clearData() {
      this.$data.parserErrorsFound = false
      this.$data.errorsFound = false
      this.$data.isTested = false
      this.$data.issueData = []
    },

    readFile() {
      this.clearData()

      const reader = new FileReader()
      const this_ = this

      reader.readAsText(this.$data.file, 'UTF-8')

      reader.onload = function (evt) {
        try {
          let results = this_.validate(evt.target.result)
          this_.$data.issueData = results.issues
          this_.$data.isTested = results.type === 'validator'
          this_.$data.parserHasErrors = results.type === 'parser'
        } catch (err) {
          console.log('Could not validate file: ' + err.message)
        }
      }

      reader.onerror = function (evt) {
        this_.add({
          type: 'error',
          title: `File read error:`,
          message: file.name,
        })
      }
    },

    ...mapActions('notifications', ['add']),
  },
}
</script>

<style src="../css/general.css"></style>
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
  background-color: var(--very-pale-yellow);
  color: var(--dark-yellow);
}

.errors .v_card__text {
  color: var(--dark-yellow) !important;
}

.errors .v-icon {
  color: var(--mid-yellow);
  padding-right: 1em;
}
</style>
