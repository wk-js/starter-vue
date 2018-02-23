'use strict'

const _ = require( 'lol/utils/object' )

module.exports = function() {

  const configs = {}

  this.action('config', function(key, config) {
    if (!key) return configs

    configs[key] = configs[key] || {}
    configs[key] = _.merge(configs[key], config)
    return configs[key]
  })

  const datas = {}

  this.action('data', function(key, data) {
    if (!key) return datas

    datas[key] = datas[key] || {}
    datas[key] = _.merge(datas[key], data)
    return datas[key]
  })

  const helpers = {}

  this.action('helper', function(hlprs) {
    if (typeof hlprs === 'string') {
      return helpers[hlprs]
    } else if (typeof hlprs === 'object') {
      Object.assign(helpers, hlprs)
    }
    return helpers
  })

  this.data('infos', {})

}