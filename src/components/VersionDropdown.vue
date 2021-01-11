<template>
  <v-container>
    <v-row id="breadcrumb-dropdown">
      <v-col @click="expandDropdown"
        >{{ currentVersion }}
      </v-col>
    </v-row>
    <v-row class="hide-options">
      <router-link
        v-for="(version, index) in versionChoices"
        :key="'version_index_' + index"
        :to="{ path: `/documentation/${versionType}/${version}` }"
      >
        {{ version }}
        <template v-if="version === currentVersion">
          <v-icon>mdi-check</v-icon>
        </template>
        <br />
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'VersionDropdown',
  props: {
    currentVersion: {
      type: String,
      default: 'latest',
    },
    versionChoices: {
      type: Array,
      default: () => {
        return []
      },
    },
    versionType: {
      type: String,
      default: '',
    },
  },
  methods: {
    expandDropdown() {
      let menu = document.getElementById('breadcrumb-dropdown')
      document.addEventListener('click', function (event) {
        var isClickInside = menu.contains(event.target)
        if (!isClickInside) {
          menu.nextSibling.classList = ['hide-options']
        }
      })

      this.$el.lastElementChild.classList = ['show-options']
    },
  },
}
</script>

<style>
.breadcrumb-dropdown {
  position: relative;
}

.hide-options {
  display: none;
  position: absolute;
}

.show-options {
  display: inline-block;
  position: absolute;
  background-color: white;
  z-index: 1;
  padding: 0.8em 1em;
  margin-right: -1em;
  border: solid 1px var(--pale-grey);
  box-shadow: var(--pale-grey);
}
</style>
