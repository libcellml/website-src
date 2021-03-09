import {
  getUserGuidesVersions,
  getApiVersions,
  getDevelopersVersions,
} from '../js/versions'

const skipPaths = [
  // KRM views to skip in the breadcrumbs
]

const skipTitles = [
  // KRM strings to remove from breadcrumb titles
  'classlibcellml_1_1',
]

const hardRoutes = {
  home: {
    text: 'HOME', // KRM change to icon here?
    name: 'Home',
    disabled: false,
    type: 'pageFromName',
  },
  documentation: {
    text: 'DOCUMENTATION',
    name: 'Home',
    disabled: false,
    hash: '#documentation',
    type: 'pageFromName',
  },
  api_reference: {
    text: 'API',
    name: 'Home',
    disabled: false,
    hash: '#api_reference',
    type: 'pageFromName',
  },
  user_guide: {
    text: 'USER GUIDES',
    name: 'Home',
    disabled: false,
    hash: '#guides',
    type: 'pageFromName',
  },
  developers: {
    text: 'DEVELOPERS',
    name: 'Home',
    disabled: false,
    hash: '#developers',
    type: 'pageFromName',
  },
  download: {
    text: 'DOWNLOAD',
    name: 'Home',
    disabled: false,
    hash: '#download',
    type: 'pageFromName',
  },
}

function convertToReadableText(bookmarkText) {
  skipTitles.forEach(title => {
    bookmarkText = bookmarkText.replaceAll(title, '')
  })
  bookmarkText = bookmarkText.replaceAll('_', ' ')
  bookmarkText = bookmarkText.replace(/([A-Z])/g, ' $1') // Insert space before capital letter
  bookmarkText = bookmarkText.replace(/([0-9])/g, ' $1') // Insert space before number
  bookmarkText = bookmarkText.trim() // Removing leading space, if present
  return bookmarkText
}

export function calculateBreadcrumbs(to) {
  // Function to interpret the upcoming route and provide an array of router links
  // that are appropriate as breadcrumbs across the top of the page.

  let routes = [hardRoutes.home]

  if (
    // to.name === '404' || // KRM: removed for option 2, save URL
    to.name === 'About' ||
    to.name === 'DownloadSummary' ||
    to.name === 'DocumentationSummary' ||
    to.name === 'DocumentationAPI' ||
    to.name === 'DocumentationUserGuides' ||
    to.name === 'DocumentationDevelopers' ||
    to.name === 'Download'
  ) {
    routes.push({
      text: to.name.toUpperCase(),
      name: 'Home',
      disabled: false,
      hash: '#' + to.name.toLowerCase(),
      type: 'pageFromName',
    })
  } else if (to.name === 'APIReferencePage') {
    routes.push(hardRoutes.api_reference)

    let lastLink = '/documentation/api'
    let path = to.path.replaceAll(lastLink, '')
    let pages = path.split('/')
    let version = pages.length > 1 ? pages[1] : null

    // Version selector block, clicking v1.2.3 takes you to class list page
    if (version) {
      routes.push({
        text: version === 'latest' ? getApiVersions()[0] : version,
        name: 'APIReferencePage',
        disabled: false,
        hash: '',
        type: 'versionSelector',
      })
      lastLink = lastLink + '/' + pages[1]
    }

    pages = pages.slice(2)

    pages.forEach(page => {
      if (page) {
        lastLink = lastLink + '/' + page

        routes.push({
          text: convertToReadableText(page).toUpperCase(),
          disabled: false,
          name: 'APIReferencePage',
          hash: '',
          params: { pageName: page },
          type: 'pageFromName',
        })
      }
    })
  } else if (to.name === 'TutorialsPage' || to.name === 'GuidesHome') {

    routes.push(hardRoutes.documentation)
    routes.push(hardRoutes.user_guide)

    let lastLink = '/documentation/guides'
    let path = to.path.replaceAll(lastLink, '')
    let pages = path.split('/')

    let version = pages.length > 1 ? pages[1] : null

    // Version selector.
    if (version) {
      routes.push({
        text: version === 'latest' ? getUserGuidesVersions()[0] : version,
        name: to.home,
        disabled: false,
        hash: '',
        type: 'versionSelector',
      })
    }

    lastLink += '/' + version

    // Any other pages
    let index = 2
    let page = pages[index]
    lastLink += '/' + page
    while (page && page !== 'index') {
      routes.push({
        text: convertToReadableText(page).toUpperCase(),
        name: to.name,
        disabled: false,
        hash: '',
        path: lastLink + (index === pages.length - 1 ? '' : '/index'),
        type: 'pageFromPath',
      })
      index += 1
      page = index < pages.length ? pages[index] : null
      lastLink += '/' + page
    }
  } else if (to.name === 'Developers') {
    routes.push(hardRoutes.developers)

    let lastLink = '/documentation/developers'
    let path = to.path.replaceAll(lastLink, '')
    let pages = path.split('/')

    let version = pages.length > 1 ? pages[1] : null

    // Version selector.
    if (version) {
      routes.push({
        text: version === 'latest' ? getDevelopersVersions()[0] : version,
        name: 'Developers',
        disabled: false,
        hash: '',
        type: 'versionSelector',
      })
    }

    lastLink += '/' + version

    // Any other pages
    let index = 2
    let page = pages[index]
    lastLink += '/' + page
    while (page && page !== 'index') {
      routes.push({
        text: convertToReadableText(page).toUpperCase(),
        name: 'Developers',
        disabled: false,
        hash: '',
        path: lastLink + (index === pages.length - 1 ? '' : '/index'),
        type: 'pageFromPath',
      })
      index += 1
      page = index < pages.length ? pages[index] : null
      lastLink += '/' + page
    }
  } else {
    const pages = to.path.split('/')
    pages.forEach(page => {
      if (page) {
        routes.push({
          text: page.toUpperCase(),
          name: page,
          disabled: false,
          hash: '',
          type: 'pageFromPath',
        })
      }
    })
  }
  return routes.reverse()
}
