'use strict'

const { spawnSync } = require('child_process')

module.exports = function GitModule( Application ) {

  this.configure.after('application:initialize', 'git:commit:last', function() {
    const ps = spawnSync('git', [ 'rev-parse --verify HEAD' ], { shell: true })

    Application.data('infos', {
      commit: ps.stdout.toString('utf-8').replace(/^\s|\s$/g, '')
    })
  })

}