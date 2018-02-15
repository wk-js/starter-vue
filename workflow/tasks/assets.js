'use strict'

desc('[Asset] Generate asset key')
task('generate_key', function() {
  console.log(require('asset-pipeline/js/cache').generateHash(Date.now()+''))
})