'use strict'

const Application  = require('./lib/application').create()
global.Application = Application

require(process.cwd() + '/config/application').call( Application )

module.exports = Application