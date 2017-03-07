'use strict'

const string = (function() {

  const EXPORTS = {
    slug: function(str) {
      return str.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    },

    camelCase: function(str) {
      str = EXPORTS.slug(str)

      const words = str.split('-').map(function(word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1)
      })

      return words.join('')
    }
  }

  return EXPORTS

})()

module.exports = string