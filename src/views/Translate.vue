<template>
  <div class="translate">
    <h1>Translate CellML models</h1>
    <p>
      This service will accept CellML 1.0/1.1 compliant files and transform them
      into CellML 2.0 compliant files. This service can accept text based files
      or
      <a href="http://co.mbine.org/specifications/omex.version-1.pdf">OMEX</a>
      files.
    </p>
    <v-container>
      <v-file-input
        v-model="files"
        show-size
        multiple
        truncate-length="64"
        label="Upload model(s)"
      >
        ></v-file-input
      >
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col col="12" md="4" id="translate">
          <v-btn
            block
            :class="'big-button'"
            v-on:click="submitFiles"
            :disabled="files.length === 0"
          >
            <v-icon color="white" x-large>mdi-translate</v-icon><br />
            Translate to CellML 2.0
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-card class="mx-auto">
        <v-list rounded>
          <v-list-subheader
            >Translated models<v-spacer /><v-btn
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
              >
                <v-list-item-icon :class="{ loading: item.pending }">
                  {{ item.pending ? 'mdi-loading' : 'mdi-download' }}
                </v-list-item-icon>
                <v-list-item-title
                  v-text="downloadFileTitle(item)"
                ></v-list-item-title>
              </v-list-item>
            </template>
            <span>Download</span>
          </v-tooltip>
        </v-list>
      </v-card>
    </v-container>
    <translate-limitations></translate-limitations>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

import TranslateLimitations from '../components/TranslateLimitations.vue'

import { translate, translateOmex, getXslt } from '@/js/translate'
import { downloadFile, downloadFileTitle } from '../js/utilities'

const store = useStore()

const xsl = ref(null)
const files = ref([])
const downloads = ref([])

function translateFiles() {
  const reader = new FileReader()

  for (const currentFile of files.value) {
    if (xsl.value !== null) {
      if (currentFile.type === '') {
        reader.readAsText(currentFile, 'UTF-8')
        reader.onload = function (evt) {
          try {
            const translatedFile = translate(evt.target.result, xsl.value)
            downloads.value.push({
              name: currentFile.name,
              data: translatedFile,
              type: 'text/xml',
              pending: false,
            })
          } catch {
            // Ok so not straight up text then.
            reader.readAsDataURL(currentFile)
            reader.onload = function (evt) {
              try {
                const base64Encoding = evt.target.result.split('base64,')
                const translatedFile = translateOmex(
                  base64Encoding[1],
                  xsl.value
                )
                const index = downloads.value.length
                downloads.value.push({
                  name: currentFile.name,
                  data: null,
                  type: 'application/x-zip',
                  pending: true,
                })
                translatedFile.then((result) => {
                  downloads.value[index].data = result
                  downloads.value[index].pending = false
                })
              } catch {
                store.dispatch('notifications/add', {
                  type: 'error',
                  title: 'Could not translate file:',
                  message: currentFile.name,
                })
              }
            }
          }
        }
        reader.onerror = function (evt) {
          store.dispatch('notifications/add', {
            type: 'error',
            title: `File read error:`,
            message: currentFile.name,
          })
        }
      } else if (currentFile.type === 'text/xml') {
        reader.readAsText(currentFile, 'UTF-8')
        reader.onload = function (evt) {
          try {
            const translatedFile = translate(evt.target.result, xsl.value)
            downloads.value.push({
              name: currentFile.name,
              data: translatedFile,
              type: 'text/xml',
              pending: false,
            })
          } catch {
            store.dispatch('notifications/add', {
              type: 'error',
              title: `Could not translate file:`,
              message: `'${currentFile.name}' of type '${currentFile.type}'.`,
            })
          }
        }
      } else {
        store.dispatch('notifications/add', {
          type: 'error',
          title: `Could not translate file:`,
          message: `'${currentFile.name}' of type '${currentFile.type}'.`,
        })
      }
    }
  }
}
function submitFiles() {
  if (xsl.value === null) {
    getXslt().then((result) => {
      xsl.value = result
      translateFiles()
    })
  } else {
    translateFiles()
  }
}
function clearDownloads() {
  downloads.value = []
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
</style>
