'use strict'

const ejs  = require( 'lodash.template' )
const path = require( 'path' )
const fs   = require( 'fs' )
const _   = require( 'asset-pipeline/js/utils/fs' )

class Template {

  constructor(input, output) {
    this.watch        = this.watch       .bind(this)
    this.include      = this.include     .bind(this)
    this.require      = this.require     .bind(this)
    this.render       = this.render      .bind(this)
    this.renderSource = this.renderSource.bind(this)

    this.input  = input
    this.output = output

    this.options = {}
    this.data    = {}
    this.ejs     = ejs

    this.includes = []

    this.enableWatch = false
  }

  render() {
    if (!this.options.filename) {
      this.options.filename = path.resolve( this.input )
    }

    _.ensureDir( path.dirname(this.output) ).then(() => {
      const rs = fs.createReadStream(this.input)
      const ws = fs.createWriteStream(this.output)

      rs.on('data', ( chunk ) => {
        chunk = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : chunk
        ws.write( this.renderSource(chunk) )
      })

      rs.on('end', () => {
        ws.end()
      })
    })
  }

  include(pth) {
    if (this.includes.indexOf(pth) === -1) {
      this.includes.push(pth)
      if (this.enableWatch) this.watch(pth, this.options.filename)
    }

    this.data.include = this.include
    this.data.require = this.require
    return Template.include(pth, this.options, this.data)
  }

  require(pth) {
    return Template.require(pth)
  }

  renderSource( src ) {
    this.data.include = this.include
    this.data.require = this.require
    return Template.render(src, this.options, this.data)
  }

  // TODO
  watch(child, parent) {
    fs.watchFile(child, { interval: 300 }, (curr, prev) => {
      if (curr.mtime > prev.mtime) {
        fs.open(parent, 0, function(err, fd) {
          if (err) return console.log(err)

          fs.fstat(fd, function(err) {
            if (err) return console.log(err)
            var now = Date.now()

            var a = parseInt(now / 1000, 10)
              , m = parseInt(now / 1000, 10)

            fs.futimes(fd, a, m, function(err) {
              if (err) return console.log(err)
              fs.close(fd)
            })
          })
        })
      }
    })
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
  return ejs(src, options)(data)
}

Template.include = function(pth, options, data) {
  pth = path.resolve(path.dirname(options.filename), pth)
  pth = path.relative(process.cwd(), pth)
  var src = fs.readFileSync(pth, 'utf-8')
  return Template.render(src, options, data)
}

Template.require = function(pth, options) {
  pth = path.resolve(path.dirname(options.filename), pth)
  return require(pth)
}

module.exports = Template