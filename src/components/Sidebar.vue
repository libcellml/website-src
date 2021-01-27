<template>
  <v-navigation-drawer v-model="isOpen" app clipped>
    <v-container>
      <v-row>
        <v-col>
          <!-- KRM: Menu list will only be included in sidebar on small screen sizes -->
          <template v-if="menuInSidebar">
            <h4>Menu</h4>
            <ul id="sidebarMenu">
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

          <template v-if="hasQuickLinks">
            <h4>Quick links</h4>
            <ul id="sidebarMenu">
              <li
                v-for="link in quickLinks"
                :key="link.label"
                style="list-style-type: none"
              >
                <router-link :to="link.url">
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </template>

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
  mounted() {
    setTimeout(() => {
        this.menuInSidebar = this.calculateMenu()
      }, this.$store.getters.getTransitionDelay)

  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  data() {
    return {
      menuInSidebar: false,
      pageHeadings: [],
      quickLinks: [],
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
    havePageHeadings() {
      return this.pageHeadings.length
    },
    hasQuickLinks() {
      return this.quickLinks.length
    }
  },

  watch: {
    pageChanged() {
      setTimeout(() => {
        this.pageHeadings = this.findHeadings()
        this.quickLinks = this.findQuickLinks()
      }, this.$store.getters.getTransitionDelay)
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
    findHeadings() {
      const headingInitial = 2
      let headingTree = []
      let el = document.querySelector('#pageContent')
      if (el) {
        let headings = this.getHeadings(el, headingInitial)
        headings.forEach((heading) => {
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
    },

    findQuickLinks() {
      let qs = document.getElementsByClassName('quicklinks')
      let quickLinks = []
      qs.forEach(q => {
        let links = q.getElementsByTagName('a')
        links.forEach(link => {
          quickLinks.push({
            label: link.textContent,
            url: link.getAttribute('href'),
          })
        })
      })
      return quickLinks
    },

    calculateMenu() {
      let menuBar = document.getElementById('topMenuBar')
      if (menuBar !== null) {
        let style = window
          .getComputedStyle(menuBar, null)
          .getPropertyValue('font-size')
        let fontSize = parseFloat(style)
        return this.width < fontSize * 54.5 // Equivalent to 54.5em
      }
      return true
    },
    handleResize() {
      this.width = window.innerWidth
      this.menuInSidebar = this.calculateMenu()
    },
  },
}
</script>

<style>
#libcellml .v-navigation-drawer__border {
  display: none;
}
</style>
