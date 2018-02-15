'use strict'

import when from 'when'
import defer from './defer'

/**
 * Stagger tasks
 *
 * @param {Function} tasks
 * @param {Number} delay - In milliseconds
 * @returns {Promise}
 */
function stagger(tasks, delay) {
  const d      = defer()
  const result = []

  let progress = 0

  function tap() {
    progress++
    if (progress == tasks.length) d.resolve( result )
  }

  return when.reduce(tasks, function(r, task) {
    task()
    .tap(tap)
    .then((value) => {
      result.push( value )
    })

    return when(true).delay(delay)
  }, null)

  // Wait stagger end
  .then(() => {
    return d.promise
  })

}

module.exports = stagger