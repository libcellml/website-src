<template>
  <v-app id="libcellml">
    <v-app-bar app clipped-left>
      <img src="./assets/logo.svg" width="40" height="40" />
      <v-app-bar-nav-icon @click="onSidebarOpen" />
      <v-row>
        <v-col
          v-for="link in links"
          :key="`${link.label}-header-link`"
          :cols="link.label === 'Home' ? 2 : 1"
        >
          <v-btn text :to="link.url">
            {{ link.label }}
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <sidebar app></sidebar>
    <!--    <BreadCrumbs />-->
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!--      <Sidebar/>-->
      <!-- Provides the application the proper gutter -->
      <v-breadcrumbs app :items="breadcrumbs" class="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            <template v-if="item.text === 'home'">
              <v-icon size="1.5em">mdi-home</v-icon>
            </template>
            <template v-else>
              {{ item.text.toUpperCase() }}
            </template>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <v-container fluid id="pageContent">
        <!-- If using vue-router -->
        <transition name="slide" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </v-container>
    </v-content>
    <NotificationContainer />
    <BackToTop />
    <v-footer app>
      <v-row justify="center" no-gutters>
        <v-col />
        <v-col class="text-center">
          {{ new Date().getFullYear() }} — <strong>libCellML</strong>
        </v-col>
        <v-col class="text-right">Created: {{ currentDate }}</v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
// <div id="app">
//   <v-app id="inspire">
//     <v-navigation-drawer
//       fixed
//       v-model="drawer"
//       app
//     >
//       <v-list dense>
//         <v-list-tile @click="">
//           <v-list-tile-action>
//             <v-icon>home</v-icon>
//           </v-list-tile-action>
//           <v-list-tile-content>
//             <v-list-tile-title>Home</v-list-tile-title>
//           </v-list-tile-content>
//         </v-list-tile>
//         <v-list-tile @click="">
//           <v-list-tile-action>
//             <v-icon>contact_mail</v-icon>
//           </v-list-tile-action>
//           <v-list-tile-content>
//             <v-list-tile-title>Contact</v-list-tile-title>
//           </v-list-tile-content>
//         </v-list-tile>
//       </v-list>
//     </v-navigation-drawer>
//     <v-toolbar color="indigo" dark fixed app>
//       <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
//       <v-toolbar-title>Application</v-toolbar-title>
//     </v-toolbar>
//     <v-content>
//       <v-container fluid fill-height>
//         <v-layout
//           justify-center
//           align-center
//         >
//           <v-flex text-xs-center>
//             <v-tooltip left>
//               <v-btn icon large :href="source" target="_blank" slot="activator">
//                 <v-icon large>code</v-icon>
//               </v-btn>
//               <span>Source</span>
//             </v-tooltip>
//           </v-flex>
//         </v-layout>
//       </v-container>
//     </v-content>
//     <v-footer color="indigo" app inset>
//       <span class="white--text">&copy; 2017</span>
//     </v-footer>
//   </v-app>
// </div>
import BackToTop from '@/components/BackToTop'
import Sidebar from '@/components/Sidebar'
import NotificationContainer from '@/components/NotificationContainer'

// import BreadCrumbs from '@/components/BreadCrumbs'

export default {
  name: 'App',

  components: {
    // BreadCrumbs,
    BackToTop,
    Sidebar,
    NotificationContainer,
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        this.addClickHandlerToggles()
        this.moveTabNames()
        this.addClickHandlerTabs()
      }
    }
  },

  data: () => ({
    pageChange: false,
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Download',
        url: '/download',
      },
      {
        label: 'Documentation',
        url: '/documentation',
      },
      {
        label: 'Developers',
        url: '/developers',
      },
      {
        label: 'About',
        url: '/about',
      },
    ],
    window: {
      width: 0,
      height: 0,
    },
  }),

  computed: {
    currentDate: () => {
      let d = new Date()
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
    },
    breadcrumbs() {
      // KRM TODO Remove last item from breadcrumbs as we don't need it.
      return this.$store.state.breadcrumbs
    },
  },

  methods: {
    onSidebarOpen() {
      this.$store.commit('setSidebarOpen', !this.$store.getters.getSidebarOpen)
    },

    // KRM
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },

    // KRM
    moveTabNames() {
      let tabGroups = this.$el.querySelectorAll('.container .tabs2')
      tabGroups.forEach((group, groupIndex) => {
        group.id = 'g' + groupIndex

        let menu = document.createElement('div')
        menu.classList.add('tab2menu')
        menu.id = 'g' + groupIndex + 'menu'

        let firstPanel = group.firstElementChild
        firstPanel.insertAdjacentElement('beforebegin', menu)

        group.querySelectorAll('.tab2').forEach((t, tabIndex) => {
          t.id = 'g' + groupIndex + 't' + tabIndex + 'tab'

          let tabName = t.querySelector('.tab2name')
          tabName.id = 'g' + groupIndex + 't' + tabIndex

          menu.appendChild(tabName)
        })

        let menuSpacer = document.createElement('div')
        menuSpacer.classList.add('tab2spacer')

        firstPanel.classList.add('active')
        menu.querySelector('#g'+groupIndex+'t0').classList.add('active')

      })
    },

    addClickHandlerToggles() {
      // Event capture for the "toggle" class:
      let headers = this.$el.querySelectorAll('.container .header')
      headers.forEach((x) => {
        x.addEventListener('click', function () {
          let contents = x.nextElementSibling
          alert('clicked!')
          if (contents != null) {
            alert(contents.style.display)
            contents.style.display =
              contents.style.display !== 'block' ? 'block' : 'none'
          }
        })
      })
    },

    addClickHandlerTabs() {
      let tabNames = this.$el.querySelectorAll('.tab2name')
      tabNames.forEach((tabName) => {
        tabName.addEventListener('click', function () {

          // Turn other tabs off.
          let group = tabName.parentElement.parentElement
          group.querySelectorAll('.tab2').forEach((tab) => {
            tab.classList.remove('active')
            tab.classList.add('inactive')
          })
          group.querySelectorAll('.tab2name').forEach((tab) => {
            tab.classList.remove('active')
            tab.classList.add('inactive')
          })
          // Turn this tab on.
          let current = group.querySelector('#' + tabName.id + 'tab')
          current.classList.add('active')
          current.classList.remove('inactive')
          tabName.classList.add('active')
          tabName.classList.remove('inactive')
        })
      })
    },

    // KRM works when the tabs aren't moved.
    // addClickHandler() {
    //   // Event capture for the "toggle" class:
    //   let headers = this.$el.querySelectorAll('.container .header')
    //   headers.forEach((x) => {
    //     x.addEventListener('click', function () {
    //       let contents = x.nextElementSibling
    //       alert('clicked!')
    //       if (contents != null) {
    //         alert(contents.style.display)
    //         contents.style.display =
    //           contents.style.display !== 'block' ? 'block' : 'none'
    //       }
    //     })
    //   })

    //   // Event capture for the "tab" class:
    //   let tabNames = this.$el.querySelectorAll('.container .tab2name')
    //   tabNames.forEach((x) => {
    //     x.addEventListener('click', function () {

    //       // Turn off all blocks in this group.
    //       let t = x.parentElement.parentElement.firstElementChild
    //       while (t) {
    //         // let c = t.querySelector('.container .tab2content')
    //         // c.classList.remove('active')
    //         // c.classList.add('inactive')

    //         t.classList.remove('active')
    //         t.classList.add('inactive')
    //         t = t.nextElementSibling
    //       }

    //       // Turns on the content
    //         x.parentElement.classList.remove('inactive')
    //         x.parentElement.classList.add('active')
    //     })
    //   })
    // },
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.pageChange = !this.pageChange
      }
    },
  },
}
</script>

<style>
#pageContent {
  background-size: 80px;
  background-position: 12px 12px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-enter {
  transform: translateX(20px);
}

.slide-leave-to {
  transform: translateX(-20px);
}

.col-1 {
  max-width: unset;
}
</style>
