'use strict'

module.exports = function Application() {

  this.configure.add('application:initialize', () => {

    this.assets.load_path     = './app'
    this.assets.dst_path      = './public'
    this.assets.cacheable     = false
    this.assets.save_manifest = false
    this.assets.force_resolve = false

    this.config('i18n').spreadSheetKey = '<spreadsheet_key>'
    this.config('i18n').default_locale = 'en'
    this.config('i18n').locales.push( 'en', 'fr' )
    this.config('i18n').load_path.push(
      this.root + '/config/locales'
    )

  })

  this.module(require('../workflow/modules/assets.js'))
  this.module(require('../workflow/modules/package.js'))
  this.module(require('../workflow/modules/environments.js'))
  this.module(require('../workflow/modules/i18n.js'))
  this.module(require('../workflow/modules/git.js'))
  this.module(require('../workflow/modules/webpack.js'))
  this.module(require('../workflow/modules/ejs.js'))

}