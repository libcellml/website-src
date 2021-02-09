<template>
  <div class="translate">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs />
          <h1>Translate CellML models</h1>
          This service will accept CellML 1.0/1.1 compliant files and transform
          them into CellML 2.0 compliant files. This service can accept text
          based files or
          <a href="http://co.mbine.org/specifications/omex.version-1.pdf"
            >omex</a
          >
          files.
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
              <v-col class="col-12 col-md-4" id="developers">
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
                <v-subheader
                  >Translated models<v-spacer /><v-btn
                    :disabled="downloads.length === 0"
                    @click="clearDownloads()"
                    >clear</v-btn
                  ></v-subheader
                >
                <v-tooltip bottom v-for="(item, i) in downloads" :key="i">
                  <template v-slot:activator="{ on }">
                    <v-list-item
                      v-on="on"
                      @click="downloadFile(item)"
                      :disabled="item.pending"
                    >
                      <v-list-item-icon :class="{ loading: item.pending }">
                        <v-icon v-if="item.pending">mdi-loading</v-icon>
                        <v-icon v-else>mdi-download</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="downloadFileTitle(item)"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <span>Download</span>
                </v-tooltip>
              </v-list>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

import filesize from 'filesize'
import { mapActions } from 'vuex'
import BreadCrumbs from '@/components/BreadCrumbs'
import { translate, translateOmex, getXslt } from '@/js/translate'

export default {
  name: 'Download',
  components: {
    BreadCrumbs,
  },
  data: function() {
    return {
      xsl: null,
      files: [],
      downloads: [],
    }
  },
  methods: {
    translateFiles() {
      const reader = new FileReader()
      const this_ = this
      const xsl = this.xsl
      this.files.forEach(file => {
        if (xsl !== null) {
          if (file.type === '') {
            reader.readAsText(file, 'UTF-8')
            reader.onload = function(evt) {
              try {
                const translatedFile = translate(evt.target.result, xsl)
                this_.downloads.push({
                  name: file.name,
                  data: translatedFile,
                  type: 'text/xml',
                  pending: false,
                })
              } catch {
                // Ok so not straight up text then.
                reader.readAsDataURL(file)
                reader.onload = function(evt) {
                  try {
                    const base64Encoding = evt.target.result.split('base64,')
                    const translatedFile = translateOmex(base64Encoding[1], xsl)
                    const index = this_.downloads.length
                    this_.downloads.push({
                      name: file.name,
                      data: null,
                      type: 'application/x-zip',
                      pending: true,
                    })
                    translatedFile.then(result => {
                      this_.downloads[index].data = result
                      this_.downloads[index].pending = false
                    })
                  } catch {
                    this_.add({
                      type: 'error',
                      title: 'Could not translate file:',
                      message: file.name,
                    })
                  }
                }
              }
            }
            reader.onerror = function(evt) {
              this_.add({
                type: 'error',
                title: `File read error:`,
                message: file.name,
              })
            }
          } else {
            this_.add({
              type: 'error',
              title: `Could not translate file:`,
              message: `'${file.name}' of type '${file.type}'.`,
            })
          }
        }
      })
    },
    submitFiles() {
      if (this.xsl === null) {
        const this_ = this
        getXslt().then(result => {
          this_.xsl = result
          this_.translateFiles()
        })
      } else {
        this.translateFiles()
      }
    },
    clearDownloads() {
      this.downloads = []
    },
    downloadFileTitle(item) {
      let title = item.name
      if (item.pending) {
        title += ' (??)'
      } else {
        title += ` (${filesize(item.data.length)})`
      }
      return title
    },
    downloadFile(item) {
      const blob = new Blob([item.data], {
        type: item.type,
      })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = item.name
      link._target = 'blank'
      link.click()
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
</style>
