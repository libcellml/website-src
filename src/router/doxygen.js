import store from '@/store'
import { handleError } from '@/router/common'

const pageType = pageName => {
  if (pageName.startsWith('namespace')) {
    return 'Namespace'
  }
  return 'Class'
}

export const updateDoxygenRoute = (routeTo, next) => {
  const mainPage = routeTo.name === 'API Documentation'
  const pageName = mainPage ? 'index' : routeTo.params.pageName
  const existingData = store.state.doxygen.pages.find(
    page => page.id === pageName,
  )
  if (!mainPage) {
    routeTo.params.componentType = pageType(pageName)
    routeTo.params.componentSubDir = 'doxygen'
  }
  if (existingData) {
    routeTo.params.data = existingData
    next()
  } else {
    store
      .dispatch('doxygen/fetchPage', pageName)
      .then(page => {
        routeTo.params.data = page
        if (mainPage) {
          next()
        } else {
          store
            .dispatch('doxygen/fetchDependeePages', pageName)
            .then(() => {
              next()
            })
            .catch(error => {
              handleError(error, next, pageName)
            })
        }
      })
      .catch(error => {
        handleError(error, next, pageName)
      })
  }
}
