/* eslint-disable */
//@api=file
//@api=prompt

const _ = require('lol/utils/string')

LocalStack().before('bundle', 'prompt', function() {
  return prompt('Component name:', 'name').then(function() {
    return ask('Is UI?', 'is_ui')
  }).then(function() {
    const is_ui = answer('is_ui')
    const name = answer('name')

    addFile('*', { base_dir: name, rename: name+'${ext}', template: true })
    ignoreFile('template.js')

    if (is_ui) {
      templateData({
        name: 'ui-' + name,
        templateName: 'UI' + _.toCapitaliz( name ) + 'Template'
      })

      output( 'app/scripts/components/ui' )
    } else {
      templateData({
        name: name,
        templateName: _.toCapitaliz( name ) + 'Template'
      })

      output( 'app/scripts/components' )
    }
  })
})