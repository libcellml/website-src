<template>
  <div>
    <basic-select
      class="version-combo-box"
      :options="versions"
      :value="version"
      @input="setSelected"
    ></basic-select
    ><template v-if="!latest"
      ><span class="version-warning"
        >This documents an old version of libCellML.
        <router-link :to="latestFullPath"
          >Click here to see the latest release</router-link
        >. Or, select a version from the drop-down menu to the left.</span
      ></template
    >
  </div>
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
.version-combo-box {
  display: inline-flex;
}
.version-warning {
  margin-left: 1em;
  background-color: lightgoldenrodyellow;
}
</style>
