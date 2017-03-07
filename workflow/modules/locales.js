'use strict'

const path   = require('path')
const CONSTS = require('../constants')

module.exports = function( Project ) {

  const DATA = Project.data.package.localization

  const LOCALE            = process.env.LOCALE || DATA.default || 'en-GB'
  const LOCALES_AVAILABLE = DATA.available || [ 'en-GB' ]

  const LOCALE_DATA = require( path.join(CONSTS.LOCALES_PATH, LOCALE) )

  Project.addData('infos', {
    locale: LOCALE
  })

  Project.addData('localization', {
    locale: LOCALE,
    available: LOCALES_AVAILABLE,
    data: LOCALE_DATA
  })

}