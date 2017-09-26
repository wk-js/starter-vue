'use strict'

const fs       = require('fs-extra')
const FileList = require('filelist').FileList
const Template = require('../lib/template')
const _        = require('lol/utils/string')
const path     = require('path')
const join     = path.join

const TEMPLATES_PATH = join( __dirname, '..', 'templates' )

const TEMPLATES = {

  section: {
    files: [
      'section/section.js',
      'section/section.styl',
      'section/section.html'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'sections' )
  },

  component: {
    files: [
      'component/component.js',
      'component/component.styl',
      'component/component.html'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'components' )
  },

  ui: {
    files: [
      'component/component.js',
      'ui/ui.styl',
      'ui/ui.html'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'components', 'ui' )
  },

  screen: {
    files: [
      'screen/screen.js',
      'screen/screen.styl',
      'screen/screen.html'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'screens' )
  }

}

desc('Generate template <name> <template>')
task('default', function( name, template_name ) {

  const config = TEMPLATES[template_name]

  if (!config || !name) {
    console.log('Cannot generate template')
    return
  }

  const filename = _.toSlug(name)

  const renderer = new Template

  const data = {
    name: name,
    filename: filename,
    templateName: _.toCamelCase(filename + '-' + 'template')
  }

  const FL = new FileList

  config.files.forEach(function(file) {
    FL.include(join(TEMPLATES_PATH, file))
  })

  FL.forEach(function(file) {
    const extname  = path.extname(file)

    let output = join( config.output, filename+extname )

    if (config.directory) {
      if (typeof config.directory === 'boolean') output = join( config.output, filename, filename+extname )
      if (typeof config.directory === 'string')  output = join( config.output, config.directory, filename+extname )
    }

    fs.ensureDirSync( path.dirname(output) )

    renderer.data   = Object.assign({}, data, config.data ? config.data(name, template_name, data) : {})
    renderer.input  = file
    renderer.output = output
    renderer.render()
  })

})