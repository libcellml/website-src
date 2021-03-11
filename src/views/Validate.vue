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
                  v-on:click="readFiles"
                  :disabled="file === null"
                >
                  <v-icon color="white" x-large>mdi-file-check-outline</v-icon
                  ><br />
                  Validate CellML 2.0 syntax
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <h2>{{ getFileName }}</h2>

            <v-card v-if="getIssues.length === 0 && fileIsTested">
              <v-card-title>No validation errors were found!</v-card-title>
            </v-card>

            <v-card v-for="(issue, j) in getIssues" :key="j">
              <v-card-title>{{ issue.type }}</v-card-title>
              <v-card-subtitle v-if="issue.ref"
                ><strong>Specification section:</strong>
                {{ issue.ref }}</v-card-subtitle
              >
              <v-card-text>{{ issue.description }}</v-card-text>
              <v-card-actions>
                <v-btn right text @click="show=false">Dismiss</v-btn>
                <v-btn text center>
                  Learn more
                </v-btn>
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

export default {
  name: 'Validate',
  components: {
    BreadCrumbs,
  },
  data: function () {
    return {
      isTested: false,
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
  },
  methods: {
    removeError() {
      alert("really?")
      this.show = false
    },
    validate(cellmlString) {
      let parser = new this.$libcellml.Parser()
      let validator = new this.$libcellml.Validator()
      let model = parser.parseModel(cellmlString)

      console.log('about to validate')
      validator.validateModel(model)

      let errors = []

      let i = 0
      while (i < validator.errorCount()) {
        let e = validator.error(i)
        errors.push({
          description: e.description(),
          ref: e.referenceHeading(),
        })
        i++
      }
      return errors
    },

    clearData() {
      this.$data.isTested = false
      this.$data.issueData = []
    },

    readFiles() {
      this.clearData()

      const reader = new FileReader()
      const this_ = this

      reader.readAsText(this.$data.file, 'UTF-8')

      reader.onload = function (evt) {
        try {
          let results = this_.validate(evt.target.result)
          this_.$data.isTested = true
          this_.$data.issueData = results
        } catch {
          console.log('could not validate')
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
  margin-top:1em;
}
</style>
