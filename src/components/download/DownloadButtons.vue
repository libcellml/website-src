<template>
  <div id="downloadButtons">
    <v-row>
      <v-col md="4">
        <v-card>
          <v-card-title>C++</v-card-title>
          <v-card-subtitle>Installers</v-card-subtitle>
          <v-card-text>
            <v-btn
              md="3"
              block
              :class="'big-button'"
              download
              :href="winDownloadHref"
              @click="onInstallerClicked(winAssetName)"
              :disabled="winDownloadDisabled"
            >
              <v-icon color="white" x-large>mdi-microsoft-windows</v-icon>
              <small-spacer />
              Windows
            </v-btn>
          </v-card-text>
          <v-card-text>
            <v-btn
              block
              :class="'big-button'"
              download
              :href="linuxDownloadHref"
              @click="onInstallerClicked(linuxAssetName)"
              :disabled="linuxDownloadDisabled"
            >
              <v-icon color="white" x-large>mdi-linux</v-icon>
              <small-spacer />
              Linux
            </v-btn>
          </v-card-text>
          <v-card-text>
            <v-btn
              md="3"
              block
              :class="'big-button'"
              download
              :href="macOSDownloadHref"
              @click="onInstallerClicked(macOSAssetName)"
              :disabled="macOSDownloadDisabled"
            >
              <v-icon color="white" x-large>mdi-apple</v-icon>
              <small-spacer />
              macOS
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-card-title>Python</v-card-title>
          <v-card-subtitle>pip install libcellml</v-card-subtitle>
          <v-card-text>
            <v-btn block md="3" :class="'big-button'" @click="onPythonClicked">
              <icon-py-pi />
              <small-spacer />
              Python
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-card-title>Web Assembly</v-card-title>
          <v-card-subtitle>yarn add libcellml.js</v-card-subtitle>
          <v-card-text>
            <v-btn block :class="'big-button'" @click="onWebAssemblyClicked">
              <icon-w-a />
              <small-spacer />
              Web assembly
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import IconWA from '@/assets/icons/IconWA.vue'
import IconPyPi from '@/assets/icons/IconPyPI.vue'
import SmallSpacer from '@/components/SmallSpacer.vue'

import { getDocumentationVersions } from '@/js/documentationversions'
import { useCommon } from '@/composables/common'
import { EVENTS, trackEvent, trackInstallerDownload } from '@/js/analytics'

const { checkDownloadAvailability } = useCommon()
const availableVersions = getDocumentationVersions()

const macOSDownloadDisabled = ref(true)
const macOSDownloadHref = ref('')
const winDownloadDisabled = ref(true)
const winDownloadHref = ref('')
const linuxDownloadDisabled = ref(true)
const linuxDownloadHref = ref('')
const macOSAssetName = ref('')
const winAssetName = ref('')
const linuxAssetName = ref('')
const route = useRoute()

const latest = availableVersions[0]

checkDownloadAvailability(latest).then((response) => {
  if (response) {
    for (const entry of response.release.releaseAssets.edges) {
      if (entry.node.name.includes('universal-macos.pkg')) {
        macOSDownloadHref.value = entry.node.downloadUrl
        macOSAssetName.value = entry.node.name
        macOSDownloadDisabled.value = false
      } else if (entry.node.name.includes('x64-windows.exe')) {
        winDownloadHref.value = entry.node.downloadUrl
        winAssetName.value = entry.node.name
        winDownloadDisabled.value = false
      } else if (entry.node.name.includes('ubuntu-runtime.deb')) {
        linuxDownloadHref.value = entry.node.downloadUrl
        linuxAssetName.value = entry.node.name
        linuxDownloadDisabled.value = false
      }
    }
  }
})

function onInstallerClicked(assetName) {
  trackInstallerDownload(
    assetName,
    latest,
    true,
    route.name === 'Home' ? 'home_page' : 'download_page',
  )
}

function onWebAssemblyClicked() {
  trackEvent(EVENTS.PACKAGE_LINK_CLICK, { ecosystem: 'npm' })
  const url = 'https://www.npmjs.com/package/libcellml.js'
  window.open(url, '_blank')
}
function onPythonClicked() {
  trackEvent(EVENTS.PACKAGE_LINK_CLICK, { ecosystem: 'pypi' })
  const url = 'https://pypi.org/project/libcellml/'
  window.open(url, '_blank')
}
</script>
