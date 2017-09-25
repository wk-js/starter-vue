'use strict'

module.exports = function Staging() {

  this.assets.DST_PATH           = './dist'
  this.assets.ASSET_KEY          = "<asset_key>"
  this.assets.KEEP_MANIFEST_FILE = true
  this.assets.cacheable          = true
  this.assets.debug              = false

  this.assets.add('assets')
  this.assets.copy('assets')

  /**
   * Entries
   */
  this.entry('styles/index.styl', 'main.css')
  this.entry('scripts/index.js', 'main.js')
  this.entry('scripts/vendor/index.js', 'vendor.js')
  this.entry('views/index.html.ejs', 'index.html', { cache: false })

  // // Example submodule
  // this.entry('submodules/example/styles/index.styl', 'example/main.css')
  // this.entry('submodules/example/scripts/index.js', 'example/main.js')
  // this.entry('submodules/example/index.html.ejs', 'example/index.html', { cache: false })
}