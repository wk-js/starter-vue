'use strict'

module.exports = function Application() {

  // Default configuration shared by all environments
  this.configure.add('application:initialize', function() {
    this.assets.LOAD_PATH          = './app'
    this.assets.DST_PATH           = './public'
    this.assets.KEEP_MANIFEST_FILE = true
    this.assets.cacheable          = false
    this.assets.debug              = true

    this.config.i18n.default_locale = 'en'
    this.config.i18n.locales.push( 'en', 'fr' )
    this.config.i18n.load_path.push(
      this.root + '/config/locales'
    )
  })

  // Add modules
  this.module( require('../workflow/modules/package.js') )
  this.module( require('../workflow/modules/assets.js') )
  this.module( require('../workflow/modules/webpack.js') )
  this.module( require('../workflow/modules/environment.js') )
  this.module( require('../workflow/modules/i18n.js') )
  this.module( require('../workflow/modules/git.js') )

}
