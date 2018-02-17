/* eslint-disable */
//@api=file
//@api=prompt

const _ = require('lol/utils/string')

LocalStack().before('bundle', 'prompt', function() {
  return prompt('Section name:').then(function(name) {
    addFile('*', { base_dir: name, rename: name+'${ext}', template: true })
    ignoreFile('template.js')

    templateData({
      name: name,
      templateName: _.toCapitaliz( name ) + 'Template'
    })

    output( 'app/scripts/sections' )
  })
})