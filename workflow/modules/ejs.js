'use strict'

const { merge } = require( 'lol/utils/object' )
const { normalize } = require( 'path' )

module.exports = function EJSModule( Application ) {

  const config = {
    data: {},
    options: {
      default_layout: normalize(__dirname + '/../../app/views/layouts/layout.html.ejs')
    }
  }

  this.config('ejs', config)

  this.configure.last('ejs:fetch_data', function() {
    config.data = merge(
      config.data,
      Application.data(),
      Application.helper()
    )
  })

}