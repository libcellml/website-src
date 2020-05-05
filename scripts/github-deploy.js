const execa = require('execa')
const fs = require('fs')

;(async () => {
  try {
    const gitBranch = 'dist'
    await execa('git', ['checkout', '--orphan', gitBranch])
    await execa('git', ['remote', 'add', 'deploy', 'git@github.com:libcellml/libcellml.github.io.git'])
    console.log('Building...')
    await execa('npm', ['run', 'build'])
    // Understand if it's dist or build folder
    const folderName = fs.existsSync('dist') ? 'dist' : 'build'
    await execa('git', ['--work-tree', folderName, 'add', '--all'])
    await execa('git', ['--work-tree', folderName, 'commit', '-m', gitBranch])
    console.log('Pushing to deploy/master...')
    await execa('git', ['push', 'deploy', 'HEAD:master', '--force'])
    await execa('rm', ['-r', folderName])
    await execa('git', ['checkout', '-f', 'master'])
    await execa('git', ['branch', '-D', gitBranch])
    console.log('Successfully deployed')
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
})()
