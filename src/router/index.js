import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store'

import { calculateBreadcrumbs } from './breadcrumbs'
import {
  getApiVersions,
  getUserGuidesVersions,
  getDevelopersVersions,
} from '../js/versions'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'libCellML'

const guideVersions = getUserGuidesVersions()
const devVersions = getDevelopersVersions()
const apiVersions = getApiVersions()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'libCellML: Home' },
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('redirect') !== null) {
        const redirect = sessionStorage.redirect
        delete sessionStorage.redirect
        next(redirect)
      } else {
        next()
      }
    },
  },
  {
    path: '/documentation',
    name: 'Documentation',
    meta: { title: 'libCellML: Documentation' },
    component: () =>
      import(
        /* webpackChunkName: "documentation" */ '../views/Documentation.vue'
      ),
  },
  {
    path: '/download',
    name: 'Download',
    meta: { title: 'libCellML: Download' },
    component: () =>
      import(/* webpackChunkName: "download" */ '../views/Download.vue'),
  },
  {
    path: '/documentation/api/:version/:pageName?',
    name: 'APIReferencePage',
    meta: { title: 'libCellML: API' },
    component: () =>
      import(/* webpackChunkName: "api" */ '../views/HelpAPIPage.vue'),
    beforeEnter: (to, from, next) => {
      if (apiVersions.includes(to.params.version)) {
        next()
      }
      else {
        next('/documentation/api/' + apiVersions[0] + '/' + to.params.pageName)
      }
    }
  },
  {
    path: '/documentation/api',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/api/' + getApiVersions()[0]
    },
  },
  {
    path: '/documentation/guides/:version',
    name: 'GuidesHome',
    meta: { title: 'libCellML: User Guides' },
    component: () =>
      import(
        /* webpackChunkName: "userguides" */ '../views/GuidesHome.vue'
      ),
    beforeEnter: (to, from, next) => {
      // Check that version exists otherwise redirect to latest version
      if (guideVersions.includes(to.params.version)) {
        next()
      }
      else {
        next('/documentation/guides/' + guideVersions[0])
      }
    },
  },
  {
    path: '/documentation/guides/:version/:pageName*',
    name: 'TutorialsPage',
    meta: { title: 'libCellML: User Guides' },
    component: () =>
      import(
        /* webpackChunkName: "userguides" */ '../views/HelpTutorialsPage.vue'
      ),
    beforeEnter: (to, from, next) => {
      if (guideVersions.includes(to.params.version)) {
        next()
      }
      else {
        next('/documentation/guides/' + guideVersions[0] + '/' + to.params.pageName)
      }
    }
  },
  {
    path: '/documentation/guides',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/guides/' + guideVersions[0]
    },
  },
  {
    path: '/documentation/developers/:version/:pageName*',
    name: 'Developers',
    meta: { title: 'libCellML: Developer Guides' },
    component: () =>
      import(/* webpackChunkName: "developers" */ '../views/Developers.vue'),
    beforeEnter: (to, from, next) => {
      if (devVersions.includes(to.params.version)) {
        next()
      }
      else {
        next('/documentation/developers/' + devVersions[0] + '/' + to.params.pageName)
      }
    }
  },
  {
    path: '/documentation/developers',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/developers/' + devVersions[0]
    },
  },
  {
    path: '/translate',
    name: 'Translate',
    meta: { title: 'libCellML: Translate' },
    component: () =>
      import(/* webpackChunkName: "translate" */ '../views/Translate.vue'),
  },
  // KRM: 404 is an actual page route.  Used for option 1 below.
  // {
  //   path: '/404',
  //   name: '404',
  //   meta: { title: 'libCellML: Not Found' },
  //   component: () =>
  //     import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  // },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () =>
      import(
        /* webpackChunkName: "networkIssue" */ '../views/NetworkIssue.vue'
      ),
  },
  // KRM: Option 1: Redirect to 404 page so that URL changes
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   redirect: to => {
  //     // Defaults to latest version, if not specified.
  //     store.commit('updateLastURL', to.fullPath)
  //     return '/404'
  //   },
  // },
  // KRM: Option 2: Do not redirect, only show 404 page content
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('updateLastURL', to.fullPath)
      next()
    }
  },
]

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,

    scrollBehavior(to, from, savedPosition) {
      if (to.path !== from.path && to.hash) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let value = { x: 0, y: 0 }
            let location = document.querySelector(to.hash)
            if (location) {
              value = window.scrollTo({
                top: location.offsetTop,
                behavior: 'smooth',
              })
            }
            resolve(value)
          }, store.getters.getTransitionDelay)
        })
      } else if (to.hash) {
        let location = document.querySelector(to.hash)
        if (location) {
          return window.scrollTo({
            top: location.offsetTop,
            behavior: 'smooth',
          })
        }
        return { x: 0, y: 0 }
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}

const router = createRouter()

router.beforeResolve((to, from, next) => {
  // Check for occurrences of 'latest' in the version field, and update
  if (to.params.version === 'latest' && to.name === 'APIReferencePage') {
    to.params.version = getApiVersions()[0]
  }
  if (to.params.version === 'latest' && to.name === 'TutorialsPage') {
    to.params.version = getUserGuidesVersions()[0]
  }
  next()
})

router.beforeEach((to, from, next) => {
  store.commit('setBreadcrumbs', calculateBreadcrumbs(to))
  store.commit('updateLastURL', to.path)
  next()
})

router.afterEach((to, from) => {
  if (to.name !== from.name) {
    store.commit('togglePageContentChanged')
  }
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})

export default router
