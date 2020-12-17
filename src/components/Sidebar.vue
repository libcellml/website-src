<template>
  <v-navigation-drawer v-model="isOpen" app clipped>
    <v-container>
      <v-row>
        <v-col>
          <!-- KRM: Menu will only be shown here at small screen sizes -->
          <template v-if="collapseMenu">
            <h4>Menu</h4>
            <ul id="example-1">
              <li
                v-for="link in links"
                :key="link.label"
                style="list-style-type: none"
              >
                <router-link :to="link.url">
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </template>
          <br />

          <template v-if="havePageHeadings">
            <h4>On this page</h4>
            <ul>
              <li
                v-for="(heading, index) in pageHeadings"
                :key="'h1_' + index"
                style="list-style-type: none"
              >
                <router-link
                  v-if="heading.id"
                  :to="`${$route.path}#${heading.id}`"
                >
                  {{ heading.el.innerText || heading.el.textContent }}
                </router-link>
                <template v-else>
                  {{ heading.el.innerText || heading.el.textContent }}
                </template>
              </li>
            </ul>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  data() {
    return {
      pageHeadings: [],
      width: 0,
      links: [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Download',
          url: '/#download',
        },
        {
          label: 'Documentation',
          url: '/#documentation',
        },
        {
          label: 'Developers',
          url: '/#developers',
        },
        {
          label: 'About',
          url: '/#about',
        },
      ],
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
    collapseMenu() {
      return this.width < 850
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

    // KRM
    handleResize() {
      this.width = window.innerWidth
    },
  },
}
</script>

<style>
#libcellml .v-navigation-drawer__border {
  display: none;
}
</style>
