'use strict'

const when = require('when')

function NOOP() {}

class Configure {

  constructor(context) {
    this._context = context || {}
    this._tasks   = {}
    this._order   = []
    this._ignores = []

    this.configured = false
    this._promise   = null
  }

  add(key, fn) {
    if (!this._tasks.hasOwnProperty(key)) this._order.push( key )
    this._tasks[key] = fn || NOOP
  }

  before(before, key, fn) {
    this.add(key, fn)

    const indexFrom = this._order.indexOf(key)
    const indexTo   = this._order.indexOf(before)

    if (indexTo == -1) {
      throw `${before} module does not exist`
    }

    this._order.splice(indexFrom, 1)
    this._order.splice(indexTo, 0, key)
  }

  after(after, key, fn) {
    this.add(key, fn)

    const indexFrom = this._order.indexOf(key)
    const indexTo   = this._order.indexOf(after)

    if (indexTo == -1) {
      throw `${after} module does not exist`
    }

    this._order.splice(indexFrom, 1)
    this._order.splice(indexTo+1, 0, key)
  }

  ignore(key) {
    this._ignores.push( key )
  }

  execute() {
    if (this.configured) return this._promise

    const order   = this._order
    const ignores = this._ignores
    const tasks   = this._tasks
    const context = this._context

    this._promise = when.reduce(order, function(res, name) {
      if (ignores.indexOf(name) != -1) {
        global.Application.logger(`Ignore ${name}`)
        return
      }

      try {
        global.Application.logger(`Execute ${name}`)
        return tasks[name].call( context )
      } catch(e) {
        global.Application.logger(`Execute ${name} [FAILED]`)
        global.Application.logger(e)
      }
    }, null).then(() => {
      return context
    })

    this.configured = true
    return this._promise
  }

}

module.exports = Configure