'use strict'

const { normalize } = require('path')

module.exports = function WebpackModule() {

  const config = {
    _entry: {},
    entry: {}
  }

  this.config('webpack', config)

  this.action('entry', function(input, output, options) {
    config._entry[input] = output
    this.assets.addFile(
      input,
      Object.assign({
        rename: output,
        keep_path: false
      }, options)
    )
  })

  this.configure.after('assets:resolve', 'webpack:setup:entry', () => {
    Object.keys(config._entry).forEach((input) => {
      config._entry[input] = this.assets.getPath(input).replace(/^\//, '')
      config.entry[config._entry[input]] = './' + normalize(input)
    })
  })

}