const fs = require('fs')
const semver = require('semver')

const stripOutSamePatchVersions = versions => {
  let versionMap = new Map()
  let strippedVersions = []
  versions.forEach(entry => {
    const major = semver.major(entry)
    const minor = semver.minor(entry)
    const version = `${major}.${minor}`
    if (!versionMap.has(version)) {
      strippedVersions.push(entry)
      versionMap.set(version, true)
    }
  })
  return strippedVersions
}

;(async () => {
  try {
    const promiseApi = new Promise((resolve, reject) => {
      fs.readdir('public/data/api', (err, files) => {
        if (err) {
          reject(err)
        }
        resolve({ api: files })
      })
    })
    const promiseUserGuides = new Promise((resolve, reject) => {
      fs.readdir('public/data/userguides', (err, files) => {
        if (err) {
          reject(err)
        }
        resolve({ userguides: files })
      })
    })
    const promiseDevelopers = new Promise((resolve, reject) => {
      fs.readdir('public/data/developers', (err, files) => {
        if (err) {
          reject(err)
        }
        resolve({ developers: files })
      })
    })

    Promise.all([promiseApi, promiseUserGuides, promiseDevelopers]).then(
      values => {
        let apiVersions = []
        let userGuidesVersions = []
        let developersVersions = []
        values.forEach(entry => {
          if (entry.api) {
            const strippedVersions = stripOutSamePatchVersions(entry.api)
            apiVersions = semver.rsort(strippedVersions).join("', '")
          } else if (entry.userguides) {
            const strippedVersions = stripOutSamePatchVersions(entry.userguides)
            userGuidesVersions = semver.rsort(strippedVersions).join("', '")
          } else if (entry.developers) {
            const strippedVersions = stripOutSamePatchVersions(entry.developers)
            developersVersions = semver.rsort(strippedVersions).join("', '")
          }
        })
        const fileTemplate = `// This file is generated do not edit!
// To make modifications to this file change 'scripts/update-versions.js'.
// To generate this file run 'npm run update-versions'.
export const getApiVersions = () => {
  return ['${apiVersions}']
}

export const getUserGuidesVersions = () => {
  return ['${userGuidesVersions}']
}

export const getDevelopersVersions = () => {
  return ['${developersVersions}']
}
`
        fs.writeFile('src/js/versions.js', fileTemplate, err => {
          if (err) {
            throw err
          } else {
            console.log('Successfully updated versions.')
          }
        })
      },
    )
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
})()
