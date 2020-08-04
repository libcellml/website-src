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
                  :to="`${$route.path}#${heading.id}`"
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
    pageChanged() {
      return this.$store.state.pageContentChanged
    },
    // pageHeadings() {
    //   if (this.$store.state.pageChanged) {
    //     // Page changed so find headings again.
    //   }
    //   console.log('finding headings ...')
    //   return this.findHeadings()
    // },
    havePageHeadings() {
      return this.pageHeadings.length
    },
  },

  watch: {
    pageChanged() {
      setTimeout(() => {
        this.pageHeadings = this.findHeadings()
      }, this.$store.getters.getTransitionDelay)
    },
  },

  // watch: {
  //   $route: {
  //     handler: function() {
  //       console.log('update my headings!!!')
  //       this.updateHeadings()
  //     },
  //     immediate: true,
  //   },
  // },

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
    findHeadings() {
      const headingInitial = 2
      //   const headingDepth = 2
      let headingTree = []
      // setTimeout(() => {
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
      return headingTree
      // this.pageHeadings = headingTree
      // }, this.$store.getters.getTransitionDelay)
    },
  },
}
</script>

<style>
#libcellml .v-navigation-drawer__border {
  display: none;
}
</style>
