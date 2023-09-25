export function useCommon() {
  const documentationInfoMap = {
    api: {
      label: 'API Documentation',
      level: 1,
      iconName: 'mdi-book-open-page-variant',
    },
    user: {
      label: "Users' Guides",
      level: 1,
      iconName: 'mdi-account-group',
    },
    tutorials: {
      label: 'Tutorials',
      level: 1,
      iconName: 'mdi-account-group',
    },
    developer: {
      label: 'Developers Documentation',
      level: 1,
      iconName: 'mdi-cogs',
    },
    howto: {
      label: 'How to',
      level: 2,
      iconName: 'mdi-account-box-multiple-outline',
    },
    runtimecodes: {
      label: 'Runtime Codes',
      level: 2,
      iconName: 'mdi-clipboard-text-play',
    },
    aside: {
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
