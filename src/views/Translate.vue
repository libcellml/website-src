<template>
  <div class="translate">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs />
          <h1>Translate CellML models</h1>
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
                <v-list-item-group color="primary">
                  <v-tooltip
                    bottom
                    v-for="(item, i) in downloads"
                    :key="i"
                    @click="downloadFile(i)"
                  >
                    <template v-slot:activator="{ on }">
                      <v-list-item v-on="on">
                        <v-list-item-icon>
                          <v-icon>mdi-download</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <span>Download</span>
                  </v-tooltip>
                </v-list-item-group>
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

import BreadCrumbs from '@/components/BreadCrumbs'
import { translate, getXslt } from '@/js/translate'

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
              this_.downloads.push({
                name: file.name,
                data: translate(evt.target.result, xsl),
              })
            }
            reader.onerror = function(evt) {
              console.log('file read error ...')
              console.log(evt)
            }
          } else {
            // console.log('Unhandled file type:', file.name, file.type)
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
    downloadFile(key) {
      const serializer = new XMLSerializer()
      const documentFragmentString = serializer.serializeToString(
        this.downloads[key].data,
      )
      const blob = new Blob([documentFragmentString], {
        type: 'text/xml',
      })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = this.downloads[key].name
      link._target = 'blank'
      link.click()
    },
  },
}
</script>
