<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 id="windows">Windows</h2>
        <h3>Available versions</h3>
        <div>TODO Stuff goes here</div>
        <h3>Requirements</h3>
        <div>TODO Stuff goes here</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 id="linux">Linux</h2>
        <h3>Available versions</h3>
        <div>TODO Stuff goes here</div>
        <h3>Requirements</h3>
        <div>TODO Stuff goes here</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 id="macos">macOS</h2>
        <h3>Available versions</h3>
        <div>TODO Stuff goes here</div>
        <h3>Requirements</h3>
        <div>TODO Stuff goes here</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 id="webassembly">WebAssembly</h2>
        <h3>Available versions</h3>
        <div>TODO Stuff goes here</div>
        <h3>Requirements</h3>
        <div>TODO Stuff goes here</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DownloadComplete',
  created() {
    alert(this.$route.path)
  }
}
</script>

<style scoped>
</style>
