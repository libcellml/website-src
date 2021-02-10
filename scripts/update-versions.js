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
    const promiseDoxygen = new Promise((resolve, reject) => {
      fs.readdir('public/data/doxygen', (err, files) => {
        if (err) {
          reject(err)
        }
        resolve({ doxygen: files })
      })
    })
    const promiseSphinx = new Promise((resolve, reject) => {
      fs.readdir('public/data/sphinx', (err, files) => {
        if (err) {
          reject(err)
        }
        resolve({ sphinx: files })
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

    Promise.all([promiseDoxygen, promiseSphinx, promiseDevelopers]).then(
      values => {
        let doxygenVersions = []
        let sphinxVersions = []
        let developersVersions = []
        values.forEach(entry => {
          if (entry.doxygen) {
            const strippedVersions = stripOutSamePatchVersions(entry.doxygen)
            doxygenVersions = semver.rsort(strippedVersions).join("', '")
          } else if (entry.sphinx) {
            const strippedVersions = stripOutSamePatchVersions(entry.sphinx)
            sphinxVersions = semver.rsort(strippedVersions).join("', '")
          } else if (entry.developers) {
            const strippedVersions = stripOutSamePatchVersions(entry.developers)
            developersVersions = semver.rsort(strippedVersions).join("', '")
          }
        })
        const fileTemplate = `// This file is generated do not edit!
// To make modifications to this file change 'scripts/update-versions.js'.
// To generate this file run 'npm run update-versions'.
export const getDoxygenVersions = () => {
  return ['${doxygenVersions}']
}

export const getSphinxVersions = () => {
  return ['${sphinxVersions}']
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
