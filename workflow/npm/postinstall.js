'use strict'

const BIN_PATH = process.cwd() + '/node_modules/.bin'
const PKG_PATH = process.cwd() + '/package.json'

const fs       = require('fs')
const pkg      = require( PKG_PATH )
const binaries = fs.readdirSync( BIN_PATH )

pkg.scripts = pkg.scripts || {}

binaries.forEach(function(bin) {
  if (!pkg.scripts.hasOwnProperty(bin)) {
    pkg.scripts[bin] = BIN_PATH + '/' + bin
  }
})

fs.writeFileSync( PKG_PATH, JSON.stringify(pkg) )