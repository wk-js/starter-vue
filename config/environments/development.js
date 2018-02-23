'use strict'

module.exports = function Development() {

  this.assets.data.locale = process.env.I18N_LOCALE

  this.assets.addFile( 'assets/**/*' )
  this.assets.manager.symlink('assets')

  this.entry('styles/index.styl'      , 'main.css')
  this.entry('scripts/index.js'       , 'main.js')
  this.entry('scripts/vendor/index.js', 'vendor.js')
  this.entry('views/index.html.ejs'   , 'index.html', {
    cache: false,
    alternatives: {
      condition: 'asset_data.locale === data',
      outputs: [
        { base_dir: 'en', data: 'en' },
        { base_dir: 'fr', data: 'fr' }
      ]
    }
  })

  this.entry('views/about.html.ejs', 'about.html')

  this.data('aws', {
    bucket: 'my_bucket',
    profile: 'my_profile',
    region: 'eu-west-1'
  })

}