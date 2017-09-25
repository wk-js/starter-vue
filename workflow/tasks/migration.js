'use strict'

const { pad, toSlug, toCamelCase } = require('lol/utils/string')
const Template        = require('../lib/template')

const CAPITAL = /[A-Z]/g

task('default', function() {
  const store = this.argv._[1]

  const caps = this.argv._[2].match(CAPITAL)
  let name = this.argv._[2].replace(CAPITAL, ' ?')
  caps.forEach(function(cap) {
    name = name.replace(/\?/, cap)
  })

  name = toSlug(name)

  const date = new Date
  let full = ''
  full += pad(date.getFullYear() , 4, 0, true)
  full += pad(date.getMonth() + 1, 2, 0, true)
  full += pad(date.getDate()     , 2, 0, true)
  full += pad(date.getHours()    , 2, 0, true)
  full += pad(date.getMinutes()  , 2, 0, true)
  full += pad(date.getSeconds()  , 2, 0, true)

  const renderer  = new Template
  renderer.data   = {
    date: full,
    name: name,
    camelCase: toCamelCase(name),
    fullname: `${full}_${name}`
  }

  renderer.input  = './workflow/templates/migration/migration.js'
  renderer.output = `./electron-node/migrations/${store}-migrations/${full}_${name}.js`
  renderer.render()
})