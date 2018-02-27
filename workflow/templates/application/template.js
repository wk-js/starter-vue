---
apis:
  - file
  - boilerplate
  - prompt
---
const _ = require('lol/utils/string')

stack().before('bundle', 'prompt', function() {
  return prompt('Application name:').then(function(name) {
    addFile('*', { base_dir: name, rename: name+'${ext}', template: true })
    addFile('*-store.js', { base_dir: name, rename: name + '-store${ext}', template: true })
    ignoreFile('template.js')

    templateData({
      name: name,
      camelCase: _.toCamelCase( name )
    })

    output( 'app/scripts/applications' )
  })
})
