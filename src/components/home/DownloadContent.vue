<template>
  <div id="downloadContent">
    <h1>Download libCellML</h1>
    <p>
      C++ binary distributions are not yet ready for release. In the meantime,
      please follow the instructions on the
      <router-link
        :to="{
          path: '/documentation/latest/userguides/installation/build_from_source',
        }"
        >Build from source
      </router-link>
      page.
    </p>
    <v-row>
      <v-col md="4">
        <v-card>
          <v-card-title>C++</v-card-title>
          <v-card-subtitle>Installers</v-card-subtitle>
          <v-card-text>
            <v-btn md="3" block :class="'big-button'" disabled>
              <v-icon color="white" x-large>mdi-microsoft-windows</v-icon>
              <small-spacer />
              Windows
            </v-btn>
          </v-card-text>
          <v-card-text>
            <v-btn block :class="'big-button'" disabled>
              <v-icon color="white" x-large>mdi-linux</v-icon>
              <small-spacer />
              Linux
            </v-btn>
          </v-card-text>
          <v-card-text>
            <v-btn md="3" block :class="'big-button'" disabled>
              <v-icon color="white" x-large>mdi-apple</v-icon>
              <small-spacer />
              macOS
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
    </v-row>
    <h3>Further information</h3>
    For further information on downloads please visit the
    <router-link to="/download">Download page</router-link>.
  </div>
</template>

<script setup>
import IconWA from '@/assets/icons/IconWA.vue'
import IconPyPi from '@/assets/icons/IconPyPI.vue'
import SmallSpacer from '../SmallSpacer.vue'

function onWebAssemblyClicked() {
  const url = 'https://www.npmjs.com/package/libcellml.js'
  window.open(url, '_blank')
}
function onPythonClicked() {
  const url = 'https://pypi.org/project/libcellml/'
  window.open(url, '_blank')
}
</script>
