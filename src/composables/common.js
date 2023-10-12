export function useCommon() {
  const documentationInfoMap = {
    api: {
      name: 'API',
      label: 'API Documentation',
      level: 1,
      iconName: 'mdi-book-open-page-variant',
    },
    user: {
      name: 'Users',
      label: "Users' Guides",
      level: 1,
      iconName: 'mdi-account-group',
    },
    tutorials: {
      name: 'Tutorials',
      label: 'Tutorials',
      level: 1,
      iconName: 'mdi-account-group',
    },
    developer: {
      name: 'Developer',
      label: 'Developers Documentation',
      level: 1,
      iconName: 'mdi-cogs',
    },
    howto: {
      name: 'HowTo',
      label: 'How to',
      level: 2,
      iconName: 'mdi-account-box-multiple-outline',
    },
    runtimecodes: {
      name: 'Runtime',
      label: 'Runtime Codes',
      level: 2,
      iconName: 'mdi-clipboard-text-play',
    },
    asides: {
      name: 'Asides',
      label: 'Asides',
      level: 2,
      iconName: 'mdi-information',
    },
  }

  function fetchResource(version, resource) {
    const url = `/generated/${version}/${resource}`
    return fetch(url)
  }
  function checkDocumentationAvailability(variable, version, name) {
    const url = `/generated/${version}/directories.json`
    return fetch(url).then((response) => {
      response.json().then(
        (content) => {
          variable.value = content.includes(name)
        },
        () => {
          variable.value = false
        },
      )
    })
  }
  async function checkDownloadAvailability(version) {
    const response = await fetchResource(version, 'release_assets.json')
    return response.json().catch((result) => {})
  }
  return {
    documentationInfoMap,
    checkDocumentationAvailability,
    checkDownloadAvailability,
  }
}
