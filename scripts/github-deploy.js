const execa = require('execa')
const fs = require('fs')

;(async () => {
  try {
    let targetBranch = 'main'
    let deployRepo = 'git@github.com:libcellml/libcellml.github.io.git'
    let readmeTitle =
      'Production version of libCellML website\n=======================================\n\n'
    if (process.argv[2] === 'staging') {
      console.log('Staging run.')
      targetBranch = 'gh-pages'
      deployRepo = 'git@github.com:libcellml/staging.git'
      readmeTitle =
        'Staging version of libCellML website\n====================================\n\n'
    } else {
      console.log('Production run.')
    }

    const gitBranch = 'dist'
    await execa('git', ['checkout', '--orphan', gitBranch])
    await execa('git', ['remote', 'add', 'deploy', deployRepo])
    console.log('Building ...')
    await execa('npm', ['run', 'build'])
    // Understand if it's dist or build folder
    const folderName = fs.existsSync('dist') ? 'dist' : 'build'
    // Write out README.rst
    await execa('echo', [
      readmeTitle,
      'Do **not** make changes to this repository.',
      'It is generated from a source repository.',
      'See the source repository https://github.com/libcellml/website-src for instructions on how to build and deploy this website.',
      '>>',
      `${folderName}/README.rst`,
    ])
    await execa('git', ['--work-tree', folderName, 'add', '--all'])
    await execa('git', ['--work-tree', folderName, 'commit', '-m', gitBranch])
    console.log('Building ... success.')
    console.log(`Pushing to deploy/${targetBranch} ...`)
    await execa('git', ['push', 'deploy', `HEAD:${targetBranch}`, '--force'])
    await execa('rm', ['-r', folderName])
    await execa('git', ['checkout', '-f', 'main'])
    await execa('git', ['branch', '-D', gitBranch])
    await execa('git', ['remote', 'rm', 'deploy'])
    console.log(`Pushing to deploy/${targetBranch} ... success.`)
    console.log('Successfully deployed!')
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
})()
