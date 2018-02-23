'use strict'

const path = require('path')

module.exports = function EnvironmentModule() {

  this.configure.after('application:initialize', 'environment:setup', () => {
    const ENV           = process.env.NODE_ENV || 'development'
    const ENV_DATA_PATH = path.join(this.root, 'config/environments/', ENV)
    const ENV_DATA      = require(ENV_DATA_PATH)

    this.data('infos', {
      env: ENV
    })

    ENV_DATA.call( this, this )
  })

}