<template>
  <v-container class="version-container" fill-height fluid>
    <v-row class="version-row" align="center" justify="start">
      <v-col
        align="left"
        justify="left"
        xs="4"
        sm="2"
        class="version-select-col"
      >
        <basic-select
          class="version-combo-box"
          :options="versions"
          :value="version"
          @input="setSelected"
        ></basic-select>
      </v-col>
      <template v-if="!latest">
        <v-col
          align="left"
          justify="center"
          xs="8"
          sm="10"
          class="version-warning-col"
        >
          <span class="version-warning"
            >This is not the latest documentation.
            <router-link :to="latestFullPath">
              Click here to see the latest release
            </router-link>
            or use the version selector on the left.
          </span>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import BasicSelect from '@/components/BasicSelect'
// import 'vue-select/dist/vue-select.css'

// :value="version"
// @input="setSelected"
export default {
  name: 'VersionComboBox',
  components: {
    BasicSelect,
  },
  props: {
    versions: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      version: '',
    }
  },
  computed: {
    latest() {
      return this.version === this.versions[0]
    },
    latestFullPath() {
      return this.$route.fullPath.replace(
        `${this.$route.params.version}`,
        `${this.versions[0]}`,
      )
    },
  },
  watch: {
    $route(to) {
      if (to.params.version !== this.version) {
        this.version = to.params.version
      }
    },
  },
  created() {
    this.version = this.$route.params.version
  },
  methods: {
    setSelected(value) {
      if (value) {
        this.version = value
        if (this.$route.params.version !== value) {
          const toFullPath = this.$route.fullPath.replace(
            `${this.$route.params.version}`,
            `${value}`,
          )
          this.$router.push(toFullPath)
        }
      }
    },
  },
}
</script>

<style>
/* .version-row {
  align: center;
  justify: center;
} */

.version-warning-col {
  margin: 0;
  align-items: center;
  padding: 5px 0px 5px 10px;
  background-color: lightgoldenrodyellow;
}
</style>
