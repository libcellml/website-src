import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store'

import { calculateBreadcrumbs } from './breadcrumbs'
import {
  getDoxygenVersions,
  getSphinxVersions,
  getDevelopersVersions,
} from '../js/versions'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'libCellML'

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
    component: () => import(/* webpackChunkName: "documentation" */ '../views/Documentation.vue'),
  },
  {
    path: '/download',
    name: 'Download',
    meta: { title: 'libCellML: Download' },
    component: () => import(/* webpackChunkName: "download" */ '../views/Download.vue'),
  },
  {
    path: '/documentation/api/:version/:pageName?',
    name: 'APIReferencePage',
    meta: { title: 'libCellML: API' },
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPIPage.vue'),
  },
  {
    path: '/documentation/api',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/api/' + getDoxygenVersions()[0]
    },
  },
  {
    path: '/documentation/guides/:version/:pageName*',
    name: 'TutorialsPage',
    meta: { title: 'libCellML: User Guides' },
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorialsPage.vue'),
  },
  {
    path: '/documentation/guides',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/guides/' + getSphinxVersions()[0]
    },
  },
  {
    path: '/documentation/developers/:version/:pageName*',
    name: 'Developers',
    meta: { title: 'libCellML: Developer Guides' },
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/Developers.vue'),
  },
  {
    path: '/documentation/developers',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/developers/' + getDevelopersVersions()[0]
    },
  },
  {
    path: '/translate',
    name: 'Translate',
    meta: { title: 'libCellML: Translate' },
    component: () =>
      import(/* webpackChunkName: "translate" */ '../views/Translate.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: { title: 'libCellML: Not Found' },
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
    to.params.version = getDoxygenVersions()[0]
  }
  if (to.params.version === 'latest' && to.name === 'TutorialsPage') {
    to.params.version = getSphinxVersions()[0]
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
