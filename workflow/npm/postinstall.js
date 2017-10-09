'use strict'

const fs   = require('fs')
const path = require('path')

const BIN_PATH          = './node_modules/.bin'
const ABSOLUTE_BIN_PATH = path.join(process.cwd(), BIN_PATH)
const PKG_PATH          = process.cwd() + '/package.json'

const pkg      = require( PKG_PATH )
const binaries = fs.readdirSync( ABSOLUTE_BIN_PATH )

pkg.scripts = pkg.scripts || {}

binaries.forEach(function(bin) {
  if (!pkg.scripts.hasOwnProperty(bin)) {
    pkg.scripts[bin] = path.join( BIN_PATH, bin )
  }
})

fs.writeFileSync( PKG_PATH, JSON.stringify(pkg) )