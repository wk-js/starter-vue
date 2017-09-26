'use strict'

const path = require('path')

module.exports = function() {

  this.configure.before('application:configure', 'environment:setup', function() {
    const ENV           = process.env.NODE_ENV || 'development'
    const ENV_DATA_PATH = path.join(process.cwd(), 'config/environments/', ENV)
    const ENV_DATA      = require(ENV_DATA_PATH)

    this.config.environment = ENV

    this.data('infos', {
      environment: ENV
    })

    ENV_DATA.call( this, this )
  })

}