'use strict'

const LOGGERS = {}

function NOOP() {}

module.exports.createLogger = function createLogger(key, enable) {
  LOGGERS[key] = {
    enabled: enable,
    log() {
      if (process.env.NODE_ENV !== 'production', LOGGERS[key].enabled) console.log.apply(console, arguments)
    }
  }
}

module.exports.getLogger = function(key) {
  return LOGGERS[key] ? LOGGERS[key].log : NOOP
}

module.exports.enableLogger = function(key, enable) {
  if (LOGGERS[key]) {
    LOGGERS[key].enabled = enable
  }
}