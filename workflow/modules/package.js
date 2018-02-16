'use strict'

module.exports = function BumpModule() {

  this.data('infos', {
    version: this.package.build
  })

}