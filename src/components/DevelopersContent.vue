<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Developers</h1>
        <h3>Building from source</h3>
        <p>
          To build your own version of libCellML from source, please see the
          instructions on the installation pages TODO.
        </p>
        <h3>Contributing to libCellML</h3>
        <p>
          libCellML is an open-source project, thus, welcoming contributions. If
          you are interested you may (in short): 
          <ul>
            <li>Check that your code passes the tests;</li>
            <li>Fork libCellML on GitHub and submit a pull request with your modifications; and </li>
            <li>Subscribe to the libCellML mailing list at TODO.</li>
          </ul>
        </p>
        <h3>Continuous integration</h3>
        <p>
          libCellML makes use of
          <a href="https://buildbot.net/">Buildbot</a> for continuous
          integration testing, all code is run through the test suite when a
          pull request is created or added to. 
          More information on how Buildbot
          is integrated in to the development process is available from the
          documentation at TODO.
          <a></a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DevelopersContent',

  data: () => ({}),
}
</script>
