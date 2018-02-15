'use strict'

const Format = require('../lib/format')

class <%= format %>Format extends Format {

  constructor() {
    super('<%= format %>')
    this.extensions.push( '<%= extension %>' )
    this.inputFormats = [  ]
  }

  getOutputOptions() {
    return super.getOutputOptions({
      /**
       * your options here
       *
       * example:
       *
       *  "bits/pixels": {
       *    value: [ 8, 16, 32 ],
       *    defaultValue: 8
       *  }
       */
    })
  }

  convert(file, options) {
    const { convert } = require('../bin/wrappers')

    return super.convert(file)
    .then(() => {
      return convert(file, options, this)
    })
  }

}

module.exports = new <%= format %>Format