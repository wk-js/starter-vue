'use strict'

const { join }     = require('path')
const { template } = require('lol/utils/string')

module.exports = function() {

  this.config.i18n = {
    default_locale: '',
    locale: process.env.I18N_LOCALE,
    locales: [],
    load_path: []
  }

  this.configure.after('application:initialize', 'localization:setup', function() {

    this.config.i18n.locale = this.config.i18n.locale || this.config.i18n.default_locale

    const locales = {}

    this.config.i18n.locales.forEach((locale) => {
      for (let i = 0, ilen = this.config.i18n.load_path.length; i < ilen; i++) {
        try {
          locales[locale] = require(join( this.config.i18n.load_path[i], locale ))
          break
        } catch(e) {}
      }
    })

    // Datas

    this.data('infos', {
      locale: this.config.i18n.locale
    })

    this.data('i18n', {
      locale: this.config.i18n.locale,
      available: this.config.i18n.locales,
      data: locales
    })

    // Helpers

    function translate(key, obj) {
      const translations = locales[this.config.i18n.locale]

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

    this.helper({
      t: translate.bind(this),
      translate: translate.bind(this),
      hasTranslation: hasTranslation.bind(this)
    })
  })

}