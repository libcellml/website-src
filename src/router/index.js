import { createWebHistory, createRouter } from 'vue-router'

import store from '@/store'

import Home from '@/views/Home.vue'
import DocumentationHome from '@/views/DocumentationHome.vue'
import About from '@/views/About.vue'

import { getDocumentationVersions } from '../js/versions'

const DEFAULT_TITLE = 'libCellML'

function checkDocumentationVersion(to) {
  const routeParams = to.params
  // Check that version exists otherwise redirect to latest version
  const availableVersions = getDocumentationVersions()
  if (availableVersions.includes(routeParams.version)) {
    store.commit('setCurrentDocumentationVersion', routeParams.version)
    return true
  } else if (routeParams.version === '') {
    return {
      name: 'Documentation',
      params: {
        version: availableVersions[0],
      },
    }
  } else if (routeParams.version === 'latest') {
    return changeRouteVersion(to, availableVersions[0])
  }

  store.dispatch('notifications/add', {
    type: 'error',
    title: `Could not find documentation for version: ${routeParams.version}`,
    message: 'redirecting to `latest` documentation page.',
  })
  return {
    name: 'Documentation',
    params: {
      version: availableVersions[0],
    },
  }
}

const homeRoute = {
  path: '/',
  name: 'Home',
  meta: { title: 'libCellML: Home' },
  component: Home,
  beforeEnter: (to, from, next) => {
    if (sessionStorage.getItem('redirect') !== null) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      next(redirect)
    } else {
      next()
    }
  },
}
const aboutRoute = {
  path: '/#about',
  name: 'About',
  component: About,
}
const baseDocumentationRoute = {
  path: '/documentation',
  name: 'DocumentationBase',
  strict: true,
  redirect: (to) => {
    // the function receives the target route as the argument
    // we return a redirect path/location here.
    return {
      name: 'DocumentationHome',
      params: { version: getDocumentationVersions()[0] },
    }
  },
}
const baseVersionDocumentationRoute = {
  path: '/documentation/:version?',
  name: 'DocumentationHome',
  meta: { title: 'libCellML: Documentation' },
  component: DocumentationHome,
  beforeEnter: (to, from, next) => {
    const nextTarget = checkDocumentationVersion(to)
    next(nextTarget)
  },
}
const apiDocumentationRoute = {
  path: '/documentation/:version/api/:pageName?',
  name: 'DocumentationAPI',
  meta: { title: 'libCellML: API' },
  component: () => import('@/views/DocumentationAPI.vue'),
  beforeEnter: (to, from, next) => {
    const nextTarget = checkDocumentationVersion(to)
    next(nextTarget)
  },
}
const developerDocumentationHomeRoute = {
  path: '/documentation/:version/developer/:pageName*',
  name: 'DocumentationDeveloper',
  meta: { title: 'libCellML: Developer' },
  component: () => import('@/views/DocumentationDeveloper.vue'),
  beforeEnter: (to, from, next) => {
    const nextTarget = checkDocumentationVersion(to)
    next(nextTarget)
  },
}
const userGuidesDocumentationHomeRoute = {
  path: '/documentation/:version/userguides',
  name: 'DocumentationUserGuidesHome',
  meta: { title: 'libCellML: User Guides' },
  component: () => import('@/views/DocumentationUserGuidesHome.vue'),
  beforeEnter: (to, from, next) => {
    const nextTarget = checkDocumentationVersion(to)
    next(nextTarget)
  },
}
const userGuidesDocumentationRoute = {
  path: '/documentation/:version/userguides/:pageName+',
  name: 'DocumentationUserGuides',
  meta: { title: 'libCellML: User Guides' },
  component: () => import('@/views/DocumentationUserGuides.vue'),
  beforeEnter: (to, from, next) => {
    const nextTarget = checkDocumentationVersion(to)
    next(nextTarget)
  },
}
const validateRoute = {
  path: '/validate',
  name: 'Validate',
  meta: { title: 'libCellML: Validate' },
  component: () => import('@/views/Validate.vue'),
}
const translateRoute = {
  path: '/translate',
  name: 'Translate',
  meta: { title: 'libCellML: Translate' },
  component: () => import('@/views/Translate.vue'),
}
const downloadRoute = {
  path: '/download',
  name: 'Download',
  meta: { title: 'libCellML: Download' },
  component: () => import('@/views/Download.vue'),
}
const importRoute = {
  path: '/import',
  name: 'Import',
  meta: { title: 'libCellML: Import' },
  component: () => import('@/views/Import.vue'),
}
const notFoundRoute = {
  path: '/404',
  name: '404',
  meta: { title: 'libCellML: Not Found' },
  component: () => import('../views/NotFound.vue'),
}
const catchEverythingRoute = {
  path: '/:unknownPageName.*',
  redirect: {
    name: '404',
  },
}

const routes = [
  homeRoute,
  aboutRoute,
  apiDocumentationRoute,
  developerDocumentationHomeRoute,
  userGuidesDocumentationHomeRoute,
  userGuidesDocumentationRoute,
  baseVersionDocumentationRoute,
  baseDocumentationRoute,
  translateRoute,
  validateRoute,
  downloadRoute,
  importRoute,
  notFoundRoute,
  catchEverythingRoute,
]

export const versionedRoutes = [
  'DocumentationAPI',
  'DocumentationDeveloper',
  'DocumentationUserGuides',
]

const onePathDeepRoutes = [
  downloadRoute.name,
  importRoute.name,
  translateRoute.name,
  validateRoute.name,
  notFoundRoute.name,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === homeRoute.name && to.hash) {
      let location = document.querySelector(to.hash)
      if (location) {
        return window.scrollTo({
          top: location.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  },
})

const prettifyTitles = [
  { search: 'classlibcellml_1_1', replace: 'Class libcellml::' },
  { search: 'namespacelibcellml', replace: 'Namespace libcellml' },
]

function convertToReadableText(bookmarkText) {
  for (const entry of prettifyTitles) {
    bookmarkText = bookmarkText.replace(entry.search, entry.replace)
  }
  bookmarkText = bookmarkText.replaceAll('_', ' ')
  // bookmarkText = bookmarkText.replace(/([A-Z])/g, ' $1') // Insert space before capital letter
  bookmarkText = bookmarkText.replace(/([0-9])/g, ' $1') // Insert space before number
  bookmarkText = bookmarkText.trim() // Removing leading space, if present
  return bookmarkText
}

function createBreadcrumb(to, label = undefined, choice = false) {
  let text = label
  if (label === undefined) {
    text = to.name
  }
  return {
    disabled: false,
    exact: false,
    link: false,
    text,
    to,
    versionChoice: choice,
  }
}

export const calculateBreadcrumbs = (to) => {
  const versions = getDocumentationVersions()
  // If I wanted to disable the breadcrumb for *Home* when on the home page
  // I would set the *to* parameter to '', but this gives me a differently
  // sized home icon which I dislike more than having the home crumb a link.
  let crumbs = [createBreadcrumb(to.name === 'Home' ? '/' : '/', 'Home')]
  if (to.name !== 'Home') {
    let pages = to.path.split('/')
    pages.shift()
    let path = ''
    let depth = 0
    if (onePathDeepRoutes.includes(to.name)) {
      crumbs.push(createBreadcrumb('', pages[0]))
    } else {
      for (const el of pages) {
        depth += 1
        path += '/' + el
        if (to.name === baseVersionDocumentationRoute.name) {
          if (versions.includes(el)) {
            crumbs.push(createBreadcrumb('', el, true))
          } else {
            crumbs.push(createBreadcrumb('', el))
          }
        } else if (to.name === aboutRoute.name) {
          crumbs.push(createBreadcrumb('', aboutRoute.name))
        } else if (to.name === apiDocumentationRoute.name) {
          if (versions.includes(el)) {
            crumbs.push(createBreadcrumb('', el, true))
          } else {
            let route = { path }
            if (el === pages[pages.length - 1]) {
              route = ''
            }

            crumbs.push(createBreadcrumb(route, convertToReadableText(el)))
          }
        } else if (
          to.name === userGuidesDocumentationRoute.name ||
          to.name === userGuidesDocumentationHomeRoute.name ||
          to.name === developerDocumentationHomeRoute.name
        ) {
          if (versions.includes(el)) {
            crumbs.push(createBreadcrumb('', el, true))
          } else {
            let subPath = 'userguides'
            if (to.name === developerDocumentationHomeRoute.name) {
              subPath = 'developer'
            }
            let route = { path }
            if (el !== subPath && path.includes(subPath)) {
              route = { path: path + '/index' }
            }
            if (depth === pages.length) {
              route = ''
            }
            if (pages[depth] === 'index') {
              route = ''
            }
            if (pages[depth - 1] !== 'index') {
              crumbs.push(createBreadcrumb(route, convertToReadableText(el)))
            }
          }
        }
      }
    }
  }

  return crumbs
}

router.beforeEach((to, from, next) => {
  store.commit('setBreadcrumbs', calculateBreadcrumbs(to))
  next()
})

router.afterEach((to, from) => {
  setTimeout(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  }, 0)
})

export default router

const keepKeys = [
  'fullPath',
  'hash',
  'href',
  // 'matched',
  'meta',
  'name',
  'params',
  'path',
  'query',
]

export const changeRouteVersion = (route, version) => {
  let clone = {}
  for (const key of keepKeys) {
    if (route[key] !== undefined) {
      clone[key] = JSON.parse(JSON.stringify(route[key]))
    }
  }
  if (clone.href !== undefined) {
    clone.href = clone.href.replace(route.params.version, version)
  }
  clone.fullPath = clone.fullPath.replace(route.params.version, version)
  clone.path = clone.path.replace(route.params.version, version)
  clone.params.version = version

  return clone
}
