'use strict'

const fs       = require('fs-extra')
const FileList = require('filelist').FileList
const Template = require('../../lib/template')
const _        = require('../../lib/utils/string')
const CONSTS   = require('../../constants')
const path     = require('path')
const join     = path.join

const templates = {
  component: {
    srcPath: join( CONSTS.TEMPLATES_PATH, 'component' ),
    dstPath: join( CONSTS.APP_PATH, 'scripts', 'components' )
  },
  section: {
    srcPath: join( CONSTS.TEMPLATES_PATH, 'section' ),
    dstPath: join( CONSTS.APP_PATH, 'scripts', 'sections' )
  }
}

desc('Generate template <name> <template>')
task('template', function( name, template_name ) {

  const template = templates[template_name]
  // let name       = wk.ARGV.name

  if (!template || !name) {
    console.log('Cannot generate template')
    return
  }

  name = _.slug(name)

  fs.ensureDirSync( join(template.dstPath, name) )

  const renderer = new Template
  renderer.data = {
    name: name,
    templateName: _.camelCase(name + '-' + 'template')
  }

  const FL = new FileList
  FL.include( join(template.srcPath, '**') )
  FL.forEach(function(file) {
    const extname = path.extname(file)
    renderer.input  = file
    renderer.output = join( template.dstPath, name, name+extname )
    renderer.render()
  })

})