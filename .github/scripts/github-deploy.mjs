import { execa } from 'execa'
import * as fs from 'fs'

;(async function main() {
  try {
    console.log('Preparing ...')
    let targetGitBranch = 'main'
    let cname = 'libcellml.org'
    let readmeTitle =
      'Production version of libCellML website\n=======================================\n\n'
    let ga_token = process.argv[2]
    if (process.argv[2] === 'staging') {
      console.log('Staging run.')
      ga_token = process.argv[3]
      cname = 'staging.libcellml.org'
      readmeTitle =
        'Staging version of libCellML website\n====================================\n\n'
    } else {
      console.log('Production run.')
    }

    const deployRepo = `git@github.com:libcellml/${cname}.git`
    const branchResult = await execa('git', ['branch', '--show-current'])
    const currentGitBranch = branchResult.stdout
    const shaResult = await execa('git', ['rev-parse', 'HEAD'])
    const currentGitSha = shaResult.stdout
    await execa('python3', ['.github/scripts/populate_website_versions.py', currentGitSha])

    const workingGitBranch = 'dist'
    await execa('git', ['checkout', '--orphan', workingGitBranch])
    await execa('git', ['remote', 'add', 'deploy', deployRepo])
    console.log('Preparing ... success.')
    console.log('Building ...')
    await fs.promises.writeFile('.env', `VITE_GA_MEASUREMENT_ID=${ga_token}`)
    await execa('yarn', ['run', 'build'])
    // Understand if it's dist or build folder
    const folderName = fs.existsSync('dist') ? 'dist' : 'build'
    // Write out README.rst
    const content = `${readmeTitle}Do **not** make changes to this repository. It is generated from a source repository. See the source repository https://github.com/libcellml/website-src for instructions on how to build and deploy this website.`
    await fs.promises.writeFile(`${folderName}/README.rst`, content)
    // Write out CNAME
    await fs.promises.writeFile(`${folderName}/CNAME`, cname)
    // Add .nojekyll to allow directories starting with '_' (see: https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)
    await fs.promises.writeFile(`${folderName}/.nojekyll`, '')
    await execa('git', ['--work-tree', folderName, 'add', '--all'])
    await execa('git', [
      '--work-tree',
      folderName,
      'commit',
      '-m',
      workingGitBranch,
    ])
    console.log('Building ... success.')
    console.log(`Pushing to deploy/${targetGitBranch} ...`)
    await execa('git', ['push', 'deploy', `HEAD:${targetGitBranch}`, '--force'])
    console.log(`Pushing to deploy/${targetGitBranch} ... success.`)
    console.log('Cleaning up ...')
    await execa('rm', ['-r', folderName])
    await execa('git', ['checkout', '-f', currentGitBranch])
    await execa('git', ['branch', '-D', workingGitBranch])
    await execa('git', ['remote', 'rm', 'deploy'])
    console.log('Cleaning up ... success.')
    console.log('Successfully deployed!')
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
})()
