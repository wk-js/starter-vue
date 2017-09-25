'use strict'

module.exports = function() {

  const path   = require('path')
  const stylus = require('stylus')
  const nodes  = stylus.nodes

  const App = global.Application

  return function(styl) {

    const baseDir = path.dirname(path.relative(App.assets.DST_PATH, styl.options.dest))

    styl.define('asset_path', function( strObject ) {
      return new nodes.Literal('url("' + App.assets.getPath( strObject.string, baseDir ) + '")')
    })

    styl.define('asset_path_str', function( strObject ) {
      return new nodes.Literal(App.assets.getPath( strObject.string, baseDir ))
    })

    styl.define('asset_url', function( strObject ) {
      return new nodes.Literal('url("' + App.assets.getUrl( strObject.string, baseDir ) + '")')
    })

    styl.define('asset_url_str', function( strObject ) {
      return new nodes.Literal(App.assets.getUrl( strObject.string, baseDir ))
    })

  }

}