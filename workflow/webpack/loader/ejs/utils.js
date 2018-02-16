'use strict'

const path     = require('path')
const Template = require('../../../lib/template')
const FM       = require('front-matter')
const fs       = require('fs')

function renderSource( src, query, resourcePath ) {
  var self = this

  // Set filename
  query.options.filename = path.relative(process.cwd(), resourcePath)

  // Force defaults
  query.options.interpolate = /<%=([\s\S]+?)%>/g

  query.data.include = function(pth) {
    self.addDependency( path.resolve(path.dirname(query.options.filename), pth) )
    query.data.filename = query.options.filename
    return Template.include(pth, query.options, query.data)
  }

  if (query.data.hasOwnProperty('asset_url') || query.data.hasOwnProperty('asset_path')) {
    query.data.asset_url  = query.data.wrap_asset_url(query.options.filename)
    query.data.asset_path = query.data.wrap_asset_path(query.options.filename)
  }

  return Template.render( src, query.options, query.data )
}

function render( src, query ) {

  if (!FM.test( src )) {
    return renderSource.call( this, src, query, this.resourcePath )
  }

  // Parse front-matter
  const FMResult = FM(src)
  const FMResultRendered = FM(`---\n${renderSource.call( this, FMResult.frontmatter, query, this.resourcePath )}\n---`)
  FMResult.attributes = FMResultRendered.attributes

  // Create same global variable as jekyll
  query.data.layout  = null
  query.data.content = FMResult.body
  query.data.page    = path.basename(this.resourcePath).split('.')[0]

  // Put front-matter properties
  for (const key in FMResult.attributes) {
    query.data[key] = FMResult.attributes[key]
  }

  // Compile the layout first before the view
  let layout_path

  if (!FMResult.attributes.hasOwnProperty('layout') && query.options.hasOwnProperty('default_layout')) {
    layout_path = query.options.default_layout
  } else if (FMResult.attributes.hasOwnProperty('layout')) {
    layout_path = path.resolve( path.dirname(this.resourcePath), FMResult.attributes.layout )
  }

  if (layout_path) {
    const layout_src = fs.readFileSync(layout_path, 'utf-8')
    this.addDependency( layout_path )

    // Render layout only
    // src = renderSource.call( this, layout_src, query, this.resourcePath )
    src = renderSource.call( this, layout_src, query, layout_path )
  }

  // Render view with layout
  return renderSource.call( this, src, query, this.resourcePath )
}

module.exports = {
  renderSource: renderSource,
  render: render
}