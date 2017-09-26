'use strict'

module.exports = function Staging() {

  this.assets.DST_PATH           = './dist'
  this.assets.ASSET_KEY          = "<asset_key>"
  this.assets.PREFIX             = '/'
  this.assets.KEEP_MANIFEST_FILE = true
  this.assets.cacheable          = true
  this.assets.debug              = false

  /**
   * Example of entries with files shared by locales
   */

  // Read process.env.SHARED property.
  // Shared assets built with config.i18n.default_locale
  if (process.env.SHARED) {
    this.assets.add('assets')
    this.assets.copy('assets')

    this.entry('styles/index.styl'      , 'main.css')
    this.entry('scripts/vendor/index.js', 'vendor.js')
    this.entry('views/index.html.ejs'   , 'index.html', { cache: false })
  }

  // Assets built by confit.i18n.locale
  else {
    this.entry('scripts/index.js'    , 'main.js'   , { baseDir: this.config.i18n.locale })
    this.entry('views/index.html.ejs', 'index.html', { baseDir: this.config.i18n.locale, cache: false })
  }

  // // Example submodule
  // this.entry('submodules/example/styles/index.styl', 'example/main.css')
  // this.entry('submodules/example/scripts/index.js', 'example/main.js')
  // this.entry('submodules/example/index.html.ejs', 'example/index.html', { cache: false })
}