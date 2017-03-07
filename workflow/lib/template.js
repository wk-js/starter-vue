'use strict'

const path         = require('path')
const fs           = require('fs-extra')
const ejs          = require('ejs')
const EventEmitter = require('events').EventEmitter

class Template extends EventEmitter {


  /**
   * Create a new template
   *
   * @param {String} input - Path the input file
   * @param {String} ouput - Path the output file
   */
  constructor(input, output) {
    super()

    this.input   = input
    this.output  = output

    this.options  = {}
    this.data     = {}
    this.ejs      = ejs
    this.includes = []
  }

  /**
   * Render
   */
  render() {

    this.emit('start')

    fs.ensureDirSync( path.dirname(this.output) )

    const rs = fs.createReadStream(this.input)
    const ws = fs.createWriteStream(this.output)

    rs.on('data', ( chunk ) => {
      chunk = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : chunk

      const matches = chunk.match(/<%(-|=).+(include)\(.+\).+%>/gi)
      if (matches) {
        matches.forEach((match) => {
          const filename = match.replace(/(<%(-|=).+(include)\(('|")|(('|")\).+%>))/gi, '')
          if (filename.length !== 0 && !/[‘“!#$%&+^<=>`]/.test(filename)) {
            this.includes.push( match.replace(/(<%(-|=).+(include)\(('|")|(('|")\).+%>))/gi, '') )
          }
        })
      }

      ws.write( this.renderSource(chunk) )
    })

    rs.on('end', () => {
      ws.end()

      this.emit('end')
    })

  }

  /**
   * Render a source
   *
   * @param {String} src
   */
  renderSource( src ) {
    return Template.render( src, this.options, this.data )
  }

}

/**
 * Render
 *
 * @param {String} src
 * @param {Object} options
 * @param {Object} data
 */
Template.render = function(src, options, data) {
  return ejs.render(src, data || {}, options || {})
}

module.exports = Template