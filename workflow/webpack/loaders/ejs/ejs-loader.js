
'use strict'

const Template = require('../../../lib/template')
const path     = require('path')

function renderSource( src, query ) {
  var self = this

  // Set filename
  query.options.filename = path.relative(process.cwd(), self.resourcePath)

  // Force defaults
  query.options.interpolate = /<%=([\s\S]+?)%>/g

  query.data.include = function(pth) {
    self.addDependency(pth)
    return Template.include(pth, query.options, query.data)
  }

  query.data.require = function(pth) {
    return Template.require(pth, query.options)
  }

  return Template.render( src, query.options, query.data )
}

module.exports = function( source ) {
  // this.cacheable && this.cacheable()

  const query = Object.assign({
    options: {},
    data: {}
  }, this.query || {})

  // // Object.assign does not make a deep clone...
  Object.assign(query.data, this.options['ejs'].data)
  Object.assign(query.options, this.options['ejs'].options)
  query.stringTest = this.options['ejs'].stringTest || query.stringTest

  const result = renderSource.call( this, source, query )

  if (this.resourcePath.match(/\.js(\.ejs)?$/)) {
    return result
  }

  if (this.resourcePath.match(/\.json(\.ejs)?$/)) {
    return 'module.exports = ' + result
  }

  return 'module.exports = ' + JSON.stringify(result)
}