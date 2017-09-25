'use strict'

module.exports = function() {
  this.pkg = require(process.cwd() + '/package.json')

  this.data('infos', {
    version: this.pkg.build_version
  })
}