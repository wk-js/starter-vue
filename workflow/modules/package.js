'use strict'

module.exports = function BumpModule() {

  this.config('infos', {
    version: this.package.build_version
  })

}