'use strict'

import when from 'when'

/**
 * Create an object with a promise and its callbacks
 *
 * @returns {Object}
 */
function defer() {
  const def = {}

  def.promise = when.promise(function(resolve, reject) {
    def.resolve = resolve
    def.reject  = reject
  })

  return def
}

export default defer