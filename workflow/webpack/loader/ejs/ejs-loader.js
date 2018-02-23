'use strict'

const { render } = require( './utils' )
const { clone } = require( 'lol/utils/object' )

module.exports = function( source ) {
  this.cacheable && this.cacheable()

  const query = {
    data: clone( this.options['ejs'].data ),
    options: clone( this.options['ejs'].options )
  }

  const result = render.call( this, source, query )

  if (this.resourcePath.match(/\.js(\.ejs)?$/)) {
    return result
  }

  if (this.resourcePath.match(/\.json(\.ejs)?$/)) {
    return 'module.exports = ' + result
  }

  return 'module.exports = ' + JSON.stringify(result)

}