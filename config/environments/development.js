'use strict'

module.exports = function Development() {

  this.assets.add('assets')
  this.assets.symlink('assets')

  this.entry('styles/index.styl', 'main.css')
  this.entry('scripts/index.js', 'main.js')
  this.entry('scripts/vendor/index.js', 'vendor.js')
  this.entry('views/index.html.ejs', 'index.html', { cache: false })

  // // Example submodule
  // this.entry('submodules/example/styles/index.styl', 'example/main.css')
  // this.entry('submodules/example/scripts/index.js', 'example/main.js')
  // this.entry('submodules/example/index.html.ejs', 'example/index.html', { cache: false })
}