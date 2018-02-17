'use strict'

const { fetchDirs } = require( 'asset-pipeline/js/utils/fs' );
const { basename }  = require( 'path' )
const { choices }   = require( 'wkt/js/api/prompt/utils' )

task('default', { async: true }, function() {

  const dirs = fetchDirs( 'workflow/templates/*' ).map(function(dir) {
    return basename(dir)
  })

  choices('Which template?', dirs)
  .catch(this.fail)
  .then(function(name) {
    return wk.exec({
      command: `$(npm bin)/wkt workflow/templates/${name}/template.js`,
      stdio: 'inherit'
    })
  })
  .then(this.complete)

})