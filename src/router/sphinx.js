import store from '@/store'
import { handleError } from '@/router/common'

const fetchPage = name => {
  const existingPageWrapper = store.state.sphinx.pages.find(
    page => page.id === name,
  )
  if (existingPageWrapper) {
    return new Promise((resolve, reject) => {
      resolve(existingPageWrapper.page)
    })
  } else {
    return store.dispatch('sphinx/fetchPage', name)
  }
}

export const updateSphinxRoute = (routeTo, next) => {
  let pageName = routeTo.params.pathMatch
  if (routeTo.name === 'TutorialsIndex') {
    pageName = 'tutorials_index'
  }
  fetchPage(pageName)
    .then(element => {
      routeTo.params.element = element
      routeTo.params.name = pageName.replace('/', '_')
      next()
    })
    .catch(error => {
      handleError(error, next, pageName)
    })
}
