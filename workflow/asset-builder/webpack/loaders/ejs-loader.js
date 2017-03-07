'use strict'

const ejs  = require('ejs')
const path = require('path')

module.exports = function( source ) {
  this.cacheable && this.cacheable()

  const query = {
    stringTest: /\.(js\.ejs)/,
    options: {},
    data: {}
  }

  // Object.assign does not make a deep clone...
  Object.assign(query.data, this.options['ejs'].data)
  Object.assign(query.options, this.options['ejs'].options)
  query.stringTest = this.options['ejs'].stringTest || query.stringTest

  query.options.filename = path.relative(process.cwd(), this.resourcePath)

  const result = ejs.compile(source, query.options)( query.data )

  if (this.resourcePath.match(query.stringTest)) {
    return result
  }

  return 'module.exports = ' + JSON.stringify(result)
}