'use strict'

const { join } = require( 'path' )
const { template } = require('lol/utils/string')

module.exports = function I18nModule( Application ) {

  this.config('i18n', {
    default_locale: '',
    locale: process.env.I18N_LOCALE,
    locales: [],
    load_path: [],
    spreadSheetKey: '',
    data: {}
  })

  this.configure.after('application:initialize', 'i18n:setup', function() {
    const config = Application.config('i18n')

    config.locale = config.locale || config.default_locale

    const datas = {}

    config.locales.forEach((locale) => {
      for (let i = 0, ilen = config.load_path.length; i < ilen; i++) {
        try {
          datas[locale] = require(join( config.load_path[i], locale ))
          break
        } catch(e) {
          // console.log(e)
        }
      }
    })

    Application.data('infos', {
      locale: config.locale
    })

    Application.data('i18n', {
      locale: config.locale,
      available: config.locales,
      data: datas
    })

    function translate(key, obj) {
      const translations = datas[config.locale]

      let entry  = translations
      const keys = key.split('.')

      keys.forEach((key)=>{
        if (entry && entry[key] !== undefined && entry[key] !== null) {
          entry = entry[key]
        } else {
          entry = null
        }
      })

      if (obj) return template(entry, obj)

      return entry || key
    }

    function hasTranslation(key, obj) {
      const value = translate(key, obj)
      return !(!value || value.length === 0 || value === key)
    }

    Application.helper({
      t: translate,
      translate: translate,
      hasTranslation: hasTranslation
    })

  })

}