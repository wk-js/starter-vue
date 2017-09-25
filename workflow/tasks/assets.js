'use strict'

desc('[Asset] Generate asset key')
task('generate_key', function() {
  console.log(require('asset-pipeline').generateAssetKey())
})

desc('resolve')
task('resolve', function() {
  const prj = require('../index.js')
  prj.make()
  return prj
})

desc('[Asset] Copy/symlink assets')
task('move', [ 'assets:resolve' ], function() {
  wk.Tasks['assets:resolve'].value.copyAssets()
})