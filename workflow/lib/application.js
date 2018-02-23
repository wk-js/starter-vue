'use strict'

const { Configure } = require('wkt/js/stack/configure')

function NOOP() {}

class Application {

  constructor() {
    this.configure = new Configure
    this.configure.add( 'application:initialize', NOOP)
    this.configure.add( 'application:configure' , NOOP)

    this.package = require(this.root + '/package.json')

    this.module(require('../modules/__app__.js'))
  }

  get root() {
    return process.cwd()
  }

  action(key, fn) {
    this[key] = fn.bind(this)
  }

  module(fn) {
    fn.call( this, this )
  }

  make(hooks) {
    hooks = hooks || { beforeTask: NOOP, afterTask: NOOP }
    return this.configure.execute(hooks)
  }

}

Application.create = function() {
  return new Application
}

module.exports = Application