'use strict'

const proj = require('../index')

task('prepare', { async: true, visible: false }, function() {
  process.env.NODE_ENV = 'release'

  proj.configured = false
  proj.resolved   = false
  proj.make()

  wk.exec([
    { command: 'rm -rf ./build', stdio: 'inherit' }
  ])
  .then(this.complete)
  .catch(this.fail)
})

task('default', [ 'release:prepare', 'webpack', 'assets:move' ], { async: true }, function() {

  wk.exec([
    { command: 'mkdir _build', cwd: './build', stdio: 'inherit' },
    {
      command: 'NODE_ENV=production npm i',
      cwd: './build/release',
      stdio: 'inherit'
    },
    {
      command: 'electron-packager ../release --platform darwin --overwrite',
      cwd: './build/_build',
      stdio: 'inherit'
    }
  ])
  .then(this.complete)
  .catch(this.fail)
})