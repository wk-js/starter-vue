'use strict'

const ejs  = require( 'lodash.template' )
const path = require( 'path' )
const fs   = require( 'fs' )

class Template {}

/**
 * Render
 *
 * @param {String} src
 * @param {Object} options
 * @param {Object} data
 */
Template.render = function(src, options, data) {
  return ejs(src, options)(data)
}

Template.include = function(pth, options, data) {
  pth = path.resolve(path.dirname(options.filename), pth)
  pth = path.relative(process.cwd(), pth)
  var src = fs.readFileSync(pth, 'utf-8')
  return Template.render(src, options, data)
}

Template.require = function(pth, options) {
  pth = path.resolve(path.dirname(options.filename), pth)
  return require(pth)
}

module.exports = Template