'use strict'

const path = require('path')

module.exports.AddExtractRules = function AddExtractRules( config, ExtractPlugin ) {

  const entries = Object.keys(config.entry).map(function(key) {
    return path.join(config.context, config.entry[key])
  }).filter(function(entry) {
    return !entry.match(/\.(js)$/)
  })

  const MATCH_ENTRIES = function(regex) {
    return function( entry ) {
      return entry.match(regex) && entries.indexOf(entry) !== -1
    }
  }

  const rules = []

  config.module.rules.forEach(function(rule) {
    const exclude = entries.filter(function(entry) {
      return entry.match(rule.test)
    })

    if (rule.exclude) {
      rule.exclude = Array.isArray(rule.exclude) ? rule.exclude : [rule.exclude]
      rule.exclude = rule.exclude.concat(exclude)
    } else {
      rule.exclude = exclude
    }

    rules.push({
      test: MATCH_ENTRIES(rule.test),
      loader: ExtractPlugin.extract( rule.use ? rule.use.slice(0) : rule.loader )
    })
  })

  config.module.rules = config.module.rules.concat(rules)
}