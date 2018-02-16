'use strict'

const FileUtils = require('wkt/js/api/file/utils')
const FileList  = require('filelist').FileList
const Template  = require('../lib/template')
const _         = require('lol/utils/string')
const path      = require('path')
const join      = path.join

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

  application: {
    files: [
      'application/application.js',
      'application/application.styl'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'sections' )
  },

  page: {
    files: [
      'page/page.js',
      'page/page.styl',
      'page/page-store.js'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'pages' )
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
      'ui/ui.js',
      'ui/ui.styl',
      'ui/ui.html'
    ],
    directory: true,
    output: join( process.cwd(), 'app', 'scripts', 'components', 'ui' )
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
    camelCase: _.toCamelCase(filename),
    templateName: _.toCamelCase(filename + '-' + 'template')
  }

  const FL = new FileList

  config.files.forEach(function(file) {
    FL.include(join(TEMPLATES_PATH, file))
  })

  FL.forEach(function(file) {
    const extname  = path.extname(file)
    const basename = path.basename(file, extname).replace(template_name, filename)

    let output = join( config.output, filename+extname )

    if (config.directory) {
      if (typeof config.directory === 'boolean') output = join( config.output, filename, basename+extname )
      if (typeof config.directory === 'string')  output = join( config.output, config.directory, basename+extname )
    }

    FileUtils.ensureDir( path.relative( process.cwd(), path.dirname(output) ) )

    renderer.data   = Object.assign({}, data, config.data ? config.data(name, template_name, data) : {})
    renderer.input  = file
    renderer.output = output
    renderer.render()
  })

})