---
apis:
  - file
  - prompt
  - boilerplate
---
const _ = require('lol/utils/string')

stack().before('bundle', 'prompt', function() {
  return prompt('Section name:').then(function(name) {
    addFile('*', { base_dir: name, rename: name+'${ext}', template: true })
    ignoreFile('template.js')

    templateData({
      name: name,
      templateName: _.toCamelCase( name ) + 'Template'
    })

    output( 'app/scripts/sections' )
  })
})