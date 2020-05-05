<template>
  <v-navigation-drawer v-model="isOpen" app clipped>
    <v-container>
      <v-row>
        <v-col>
          <h4>On this page</h4>
          <template v-if="havePageHeadings">
            <ul>
              <li v-for="(heading, index) in pageHeadings" :key="'h1_' + index">
                <router-link
                  v-if="heading.id"
                  :to="{
                    name: routeName,
                    hash: '#' + heading.id,
                    params: routeParams,
                  }"
                >
                  {{
                    heading.el.innerText || heading.el.textContent
                  }}</router-link
                >
                <template v-else>{{
                  heading.el.innerText || heading.el.textContent
                }}</template>
              </li>
            </ul>
          </template>
          <template v-else>
            <span>Some default sidebar content.</span>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  props: ['routeName', 'routeParams'],

  data() {
    return {
      pageHeadings: [],
    }
  },

  computed: {
    isOpen: {
      get() {
        return this.$store.getters.getSidebarOpen
      },
      set(newValue) {
        this.$store.commit('setSidebarOpen', newValue)
      },
    },
    havePageHeadings() {
      return this.pageHeadings.length
    },
  },

  watch: {
    routeName: function() {
      this.updateHeadings()
    },
  },

  methods: {
    getHeadings(element, level) {
      return element.getElementsByTagName('h' + level)
    },
    getHeaderLinkId(element) {
      let id = element.getAttribute('id')
      if (!id) {
        if (element.parentElement.nodeName === 'SECTION') {
          id = element.parentElement.getAttribute('id')
        }
      }
      return id
    },
    updateHeadings() {
      const headingInitial = 2
      //   const headingDepth = 2
      const transitionDelay = 1100
      let headingTree = []
      setTimeout(() => {
        let el = document.querySelector('#pageContent')
        if (el) {
          let headings = this.getHeadings(el, headingInitial)
          headings.forEach(heading => {
            let subHeadings = this.getHeadings(heading, headingInitial + 1)
            const treeEntry = {
              el: heading,
              id: this.getHeaderLinkId(heading),
              children: subHeadings,
            }
            headingTree.push(treeEntry)
          })
        }
        this.pageHeadings = headingTree
      }, transitionDelay)
    },
  },
}
</script>

<style>
#libcellml .v-navigation-drawer__border {
  display: none;
}
</style>
