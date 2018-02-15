'use strict'

const Application  = require('./lib/application').create()

require(process.cwd() + '/config/application').call( Application )

module.exports = Application