'use strict'

module.exports = function() {

  const stylus = require('stylus')
  const nodes  = stylus.nodes

  const App = require( '../../../../index' )

  return function(styl) {

    const asset_path = App.helper('wrap_asset_path')( styl.options.filename )
    const asset_url  = App.helper('wrap_asset_url' )( styl.options.filename )

    styl.define('asset_path', function( strObject ) {
      return new nodes.Literal('url("' + asset_path( strObject.string ) + '")')
    })

    styl.define('asset_path_src', function( strObject ) {
      return new nodes.Literal(asset_path( strObject.string ))
    })

    styl.define('asset_url', function( strObject ) {
      return new nodes.Literal('url("' + asset_url( strObject.string ) + '")')
    })

    styl.define('asset_url_src', function( strObject ) {
      return new nodes.Literal(asset_url( strObject.string ))
    })

  }

}