import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store'
import { mdiSortReverseVariant } from '@mdi/js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () =>
      import(
        /* webpackChunkName: "documentation" */ '../views/Documentation.vue'
      ),
  },
  {
    path: '/documentation/api/:version/:pageName?',
    name: 'APIReferencePage',
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPIPage.vue'),
  },
  {
    path: '/documentation/api',
    name: 'APIReference',
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPI.vue'),
  },
  {
    path: '/documentation/tutorials/:version/:pageName*',
    // path: '/documentation/tutorials/:pageName*',
    name: 'TutorialsPage',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorialsPage.vue'),
  },
  {
    path: '/documentation/tutorials',
    name: 'Tutorials',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorials.vue'),
  },
  {
    path: '/developers',
    name: 'Developers',
    component: () =>
      import(/* webpackChunkName: "developers" */ '../views/Developers.vue'),
  },
  {
    path: '/download',
    name: 'Download',
    component: () =>
      import(/* webpackChunkName: "download" */ '../views/Download.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () =>
      import(
        /* webpackChunkName: "networkIssue" */ '../views/NetworkIssue.vue'
      ),
  },
  {
    path: '*',
    redirect: {
      name: '404',
      params: { resource: 'page' },
    },
  },
]

const skipPaths = [
  // KRM views to skip in the breadcrumbs
]

const skipTitles = [
  // KRM strings to remove from breadcrumb titles
  'classlibcellml_1_1',
]
const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.path !== from.path) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let value = { x: 0, y: 0 }
            if (to.hash) {
              value = window.scrollTo({
                top: document.querySelector(to.hash).offsetTop,
                behavior: 'smooth',
              })
            }
            resolve(value)
          }, store.getters.getTransitionDelay)
        })
      } else if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}

const router = createRouter()


router.beforeEach((to, from, next) => {

  // KRM Breadcrumb calculation
  let items = [
    {
      text: 'home',
      disabled: false,
      href: '/',
    },
  ]
  if (to.name === 'Home') {
    items[0].disabled = true
  } else if (
    to.name === '404' ||
    to.name === 'About' ||
    to.name === 'Developers' ||
    to.name === 'Download' ||
    to.name === 'Documentation'
  ) {
    items.push({
      text: to.name,
      disabled: true,
      href: to.path,
    })
  } else if (
    to.name === 'APIReferencePage'
    || to.name === 'APIReference') {
    // let basePath = '/documentation/api/'
    // let path = to.path.replace(basePath, '')

    let basePath = '/'
    let path = to.path

    let pages = path.split('/')
    let lastLink = ''

    pages.forEach(page => {
      if (page) {
        lastLink = lastLink + '/' + page 

        let bookmarkText = page
        skipTitles.forEach(title => {
          bookmarkText = bookmarkText.replaceAll(title, '')
        })
        bookmarkText.replaceAll('_', ' ')
        let href = basePath + lastLink

        href = href.replaceAll('//', '/')

        items.push({
          text: bookmarkText,
          disabled: false,
          href: href,
        })
      }
    })
  }

  // KRM
  else if (to.name === 'TutorialsPage' || to.name === 'Tutorials') {
    // let basePath = '/documentation/tutorials/'
    // let path = to.path.replace(basePath, '')

    let basePath = '/'
    let path = to.path

    let pages = path.split('/')
    let lastLink = ''

    pages.forEach(page => {
      if (page && page != "index") {
        lastLink = lastLink + '/' + page 
        // Remove page items from the list if they're in directories that don't have an index file
        if (!skipPaths.includes(lastLink)) {
          items.push({
            text: page.replaceAll('_', ' '),
            disabled: false,
            href: basePath + lastLink + 'index',
          })
        }
      }
    })
  }
  // KRM reversing order of breadcrumbs so that we can truncate the list on the left hand side.
  store.commit('setBreadcrumbs', items.slice().reverse())
  store.commit('updateLastURL', to.path)

  next()
})

router.afterEach((to, from) => {
  if (to.name !== from.name) {
    store.commit('togglePageContentChanged')
  }
})

export default router
