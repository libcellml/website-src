import DoxygenService from '@/services/DoxygenService'
import { decodeHTML } from '@/utils/utilities'

const semver = require('semver')

const semvercmp = (left, right) => {
  if (semver.eq(left, right)) {
    return 0
  } else if (semver.lt(left, right)) {
    return 1
  }
  return -1
}

export const namespaced = true

export const state = {
  pages: new Map(),
}

export const mutations = {
  APPEND_PAGE(state, { version, page }) {
    console.log('appending page', version, page)
    if (!state.pages.has(version)) {
      state.pages.set(version, [])
    }
    let pages = state.pages.get(version)
    console.log(pages, page)
    pages.push(page)
    console.log(pages)
    state.pages.set(version, pages)
    console.log(state.pages)
    console.log('done here.')
  },
  SET_VERSIONS(state, versions) {
    console.log('setting versions')
    console.log(versions)
    versions.forEach(version => {
      state.pages.set(version, [])
    })
    console.log(state.pages)
  },
}

function splitNamespace(text) {
  return text.split('::')
}

function parseMainPage(xmlDoc) {
  let namespaceElements = xmlDoc.querySelectorAll('compound[kind="namespace"]')
  let classElements = xmlDoc.querySelectorAll('compound[kind="class"]')
  let fileElements = xmlDoc.querySelectorAll('compound[kind="file"]')

  let namespaces = []
  namespaceElements.forEach(namespaceElement => {
    namespaces.push({
      name: namespaceElement.querySelector('name').innerHTML,
      refId: namespaceElement.getAttribute('refid'),
      classes: [],
    })
  })
  classElements.forEach(classElement => {
    const splitNames = splitNamespace(
      classElement.querySelector('name').innerHTML,
    )
    let candidateNamespace = namespaces.find(
      namespace => namespace.name === splitNames[0],
    )
    candidateNamespace.classes.push({
      name: classElement.querySelector('name').innerHTML,
      refId: classElement.getAttribute('refid'),
    })
  })

  let files = []
  fileElements.forEach(fileElement => {
    files.push({
      name: fileElement.querySelector('name').innerHTML,
      refId: fileElement.getAttribute('refid'),
    })
  })

  return {
    id: 'index',
    namespaces,
    files,
  }
}

function getDescriptions(element) {
  const brief = element.querySelector(':scope > briefdescription')
  const detailed = element.querySelector(':scope > detaileddescription')

  return {
    brief,
    detailed,
  }
}

function parseMemberDef(element) {
  const { brief, detailed } = getDescriptions(element)
  return {
    id: element.getAttribute('id'),
    name: element.querySelector('name'),
    argsString: decodeHTML(element.querySelector('argsstring').innerHTML),
    kind: element.getAttribute('kind'),
    accessSpecifier: element.getAttribute('prot'),
    memberDefType: parseLinkedTextType(element.querySelector('type')),
    definition: element.querySelector('definition'),
    brief,
    detailed,
  }
}

function parseMemberDefs(element) {
  const memberDefElements = element.querySelectorAll('memberdef')
  let memberDefs = []
  memberDefElements.forEach(memberDefElement => {
    memberDefs.push(parseMemberDef(memberDefElement))
  })
  return memberDefs
}

function parseNamespace(element) {
  const id = element.getAttribute('id')
  const name = element.querySelector('compoundname').innerHTML
  const classElements = element.querySelectorAll('innerclass')
  const sectionElements = element.querySelectorAll('sectiondef')
  const { brief, detailed } = getDescriptions(element)
  let classes = []
  classElements.forEach(classElement => {
    classes.push({
      name: classElement.innerHTML,
      refId: classElement.getAttribute('refid'),
    })
  })
  let sections = []
  sectionElements.forEach(sectionElement => {
    const members = parseMemberDefs(sectionElement)
    sections.push({
      members,
      kind: sectionElement.getAttribute('kind'),
    })
  })

  return {
    id,
    name,
    brief,
    detailed,
    classes,
    sections,
  }
}

function parseLocationType(element) {
  return {
    header: element.getAttribute('file'),
  }
}

function parseRefTextType(element) {
  return {
    refId: element.getAttribute('refid'),
    refKind: element.getAttribute('kindref'),
    text: element.innerHTML,
  }
}

export function parseLinkedTextType(element) {
  let text = element.textContent
  let linkedText = ''
  let reference = null
  const refElement = element.querySelector('ref')
  if (element.hasAttribute('refid')) {
    reference = parseRefTextType(element)
    linkedText = reference.text
  } else if (refElement && refElement.hasAttribute('refid')) {
    reference = parseRefTextType(refElement)
    linkedText = reference.text
  }

  return {
    text,
    linkedText,
    reference,
  }
}

function parseCompoundRefs(elements) {
  let compoundRefs = []
  elements.forEach(element => {
    compoundRefs.push({
      name: element.innerHTML,
      refId: element.getAttribute('refid'),
      accessSpecifier: element.getAttribute('prot'),
      virtual: element.getAttribute('virt') !== 'non-virtual',
    })
  })
  return compoundRefs
}

function parseListOfAllMembers(element) {
  let members = []
  element.querySelectorAll('member[prot="public"]').forEach(element => {
    members.push({
      refId: element.getAttribute('refid'),
      accessSpecifier: element.getAttribute('prot'),
      scope: element.querySelector('scope').innerHTML,
      name: element.querySelector('name').innerHTML,
    })
  })

  return members
}

function parseParam(element) {
  return {
    paramType: parseLinkedTextType(element.querySelector('type')),
    name: element.querySelector('declname').textContent,
  }
}

function parseParams(elements) {
  let params = []
  elements.forEach(element => {
    params.push(parseParam(element))
  })
  return params
}

function parsePublicFunction(element) {
  const { brief, detailed } = getDescriptions(element)
  return {
    id: element.getAttribute('id'),
    brief,
    detailed,
    params: parseParams(element.querySelectorAll('param')),
    returnType: parseLinkedTextType(element.querySelector('type')),
    accessSpecifier: element.getAttribute('prot'),
    definition: element.querySelector('definition').innerHTML,
    argsString: decodeHTML(element.querySelector('argsstring').innerHTML),
    name: element.querySelector('name').innerHTML,
    location: parseLocationType(element.querySelector('location')),
  }
}

function parsePublicFunctions(elements) {
  let publicFunctions = []
  elements.forEach(element => {
    const memberDefs = element.querySelectorAll('memberdef')
    memberDefs.forEach(memberDef => {
      publicFunctions.push(parsePublicFunction(memberDef))
    })
  })

  return publicFunctions
}

function parseClass(element) {
  const id = element.getAttribute('id')
  const name = element.querySelector('compoundname').innerHTML
  const baseClasses = parseCompoundRefs(
    element.querySelectorAll('basecompoundref'),
  )
  const derivedClasses = parseCompoundRefs(
    element.querySelectorAll('derivedcompoundref'),
  )
  const { brief, detailed } = getDescriptions(element)
  const location = parseLocationType(element.querySelector('location'))
  let listOfAllMembers = parseListOfAllMembers(
    element.querySelector('listofallmembers'),
  )
  let publicFunctions = parsePublicFunctions(
    element.querySelectorAll('sectiondef[kind="public-func"]'),
  )
  let publicStaticFunctions = parsePublicFunctions(
    element.querySelectorAll('sectiondef[kind="public-static-func"]'),
  )

  return {
    id,
    name,
    brief,
    detailed,
    baseClasses,
    derivedClasses,
    location,
    listOfAllMembers,
    publicFunctions,
    publicStaticFunctions,
  }
}

function parsePage(reference, pageText) {
  let parser = new DOMParser()
  let xmlDoc = parser.parseFromString(pageText, 'text/xml')
  const doxygenIndex = xmlDoc.querySelector('doxygenindex')
  let page = null
  if (doxygenIndex) {
    page = parseMainPage(xmlDoc)
  } else {
    const compoundDef = xmlDoc.querySelector(
      'compounddef[id="' + reference + '"',
    )
    const kind = compoundDef.getAttribute('kind')
    if (kind === 'namespace') {
      page = parseNamespace(compoundDef)
    } else if (kind === 'class') {
      page = parseClass(compoundDef)
    } else {
      console.log(
        'Dont know what to do with kind:',
        kind,
        ' with reference:',
        reference,
      )
    }
  }

  return page
}

export const actions = {
  getVersions({ commit }) {
    return DoxygenService.getVersions().then(response => {
      let versions = response.data
      commit('SET_VERSIONS', versions)
      console.log('got versions')
      console.log(versions)
      versions.sort(semvercmp)
      console.log(versions)
      return versions
    })
  },
  fetchPage({ dispatch, commit }, { version, page_name }) {
    console.log('fetch page:', version, page_name)
    return DoxygenService.getPage(version, page_name)
      .then(response => {
        const page = parsePage(page_name, response.data)
        commit('APPEND_PAGE', { version, page })
        const notification = {
          type: 'success',
          title: 'Page successfully retrieved',
          message: page_name,
        }
        dispatch('notifications/add', notification, { root: true })
        return page
      })
      .catch(error => {
        const notification = {
          type: 'error',
          title: 'Page fetch failed: ' + page_name,
          message: error.message,
        }
        dispatch('notifications/add', notification, { root: true })
      })
  },
  fetchDependeePages({ commit, getters }, { version, page_name_source }) {
    console.log('getting involved', version, page_name_source)
    const dependentPage = getters.getPageById(version, page_name_source)
    let pageNames = []
    if (dependentPage) {
      if (dependentPage.hasOwnProperty('baseClasses')) {
        dependentPage.baseClasses.forEach(baseClass => {
          if (baseClass.refId) {
            pageNames.push(baseClass.refId)
          }
        })
      }
    }

    let promises = []
    pageNames.forEach(pageName => {
      promises.push(DoxygenService.getPage(version, pageName))
    })
    return Promise.all(promises).then(pagesReceived => {
      let i = 0
      pagesReceived.forEach(response => {
        const pageName = pageNames[i++]
        const parsedPage = parsePage(pageName, response.data)
        commit('APPEND_PAGE', { version, page: parsedPage })
      })
    })
  },
}

export const getters = {
  getPageById: state => (version, id) => {
    console.log('page by id:', version, id, state.pages.get(version))
    return state.pages.has(version)
      ? state.pages.get(version).find(page => page.id === id)
      : undefined
  },
  getPageIdForReferenceId: state => (version, reference) => {
    const candidatePage = state.pages
      .get(version)
      .find(page => reference.startsWith(page.id))
    if (candidatePage) {
      return candidatePage.id
    }
    return candidatePage
  },
  getPageByName: state => (version, name) => {
    return state.pages.get(version).find(page => page.name === name)
  },
  getDependeePages: (state, getters) => (version, id, recursive) => {
    const originalPage = getters.getPageById(version, id)
    let dependentPages = []
    if (originalPage.hasOwnProperty('baseClasses')) {
      originalPage.baseClasses.forEach(baseClass => {
        if (baseClass.refId) {
          const dependentPage = getters.getPageById(version, baseClass.refId)
          dependentPages.push(dependentPage)
          if (!!recursive) {
            const dependentDependentPages = getters.getDependeePages(
              version,
              dependentPage.id,
              true,
            )
            dependentPages = [
              ...new Set([...dependentPages, ...dependentDependentPages]),
            ]
          }
        }
      })
    }
    return dependentPages
  },
}
