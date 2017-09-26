'use strict'

desc('[Asset] Generate asset key')
task('generate_key', function() {
  console.log(require('asset-pipeline').generateAssetKey())
})

desc('resolve')
task('resolve', { async: true }, function() {
  const Application = require('../index.js')
  Application.make()
  .then(this.complete)
  .catch(this.fail)
})

desc('[Asset] Copy/symlink assets')
task('move', { async: true }, function() {
  const Application  = require('../index.js')
  Application.silent = true
  Application.configure.after('assets:resolve', 'assets:move', function() {
    this.assets.proceedMove()
  })
  Application.make()
  .then(this.complete)
  .catch(this.fail)
})