<template>
  <div class="tutorials">
    <v-container>
      <v-row>
        <v-col>
          <div class="container toggle">
            <div class="container header">CLICK ME!</div>
            <div class="container infospec">
              HIDE ME ... blah blah balh
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
          </div>

          <div class="version-box">
            <version-combo-box
              :versions="availableVersions"
            ></version-combo-box>
          </div>
          <sphinx-page
            :baseURL="`/data/sphinx/${$route.params.version}`"
            indexFileName="tutorials_index"
            @updated="updated"
          ></sphinx-page>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { SphinxPage } from 'vue-sphinx-xml'
import VersionComboBox from '@/components/VersionComboBox'

import { getSphinxVersions } from '@/js/versions'

export default {
  name: 'TutorialsPage',
  components: {
    SphinxPage,
    VersionComboBox,
  },
  computed: {
    availableVersions() {
      return getSphinxVersions()
    },
  },
  methods: {
    updated() {
      this.$store.commit('togglePageContentChanged')
      this.addClickHandler()
    },
    addClickHandler: function () {
      var headers = this.$el.querySelectorAll('.container.header')
      headers.forEach((x) => {
        x.addEventListener('click', function () {
          var contents = x.nextElementSibling
          if (contents != null) {
            contents.style.display =
              contents.style.display === 'none' ? 'block' : 'none'
          }
        })
      })
    },
  },
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
</style>
