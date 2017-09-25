'use strict'

const Configure = require('./configure')

class Application {

  constructor() {
    this.config = {}

    this._helpers = {}
    this._datas   = {}

    this.configure = new Configure(this)

    // Setup
    this.configure.add( 'application:initialize' )
    this.configure.add( 'application:configure' )
  }

  get root() {
    return process.cwd()
  }

  module(fn) {
    fn.call( this, this )
  }

  helper(obj) {
    Object.assign(this._helpers, obj)
  }

  data(key, obj) {
    const data      = this._datas[key] || {}
    this._datas[key] = Object.assign(data, obj)
  }

  make() {
    return this.configure.execute()
  }

}

Application.create = function() {
  return new Application
}

module.exports = Application