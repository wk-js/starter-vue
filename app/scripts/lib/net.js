'use strict'

const when = require('when')

function format( request, options ) {
  var result = {}

  Object.keys(request).forEach(function(key) {
    if (typeof request[key] == 'function') return

    if (key == 'response') {
      if (options.responseType.match(/json/gi) && request.hasOwnProperty('responseText')) {
        result[key] = JSON.parse(request.responseText)
        return
      }
    }

    result[key] = request[key]
  })

  return result
}

export default {

  load: function(url, options) {
    var o = Object.assign({
      method: 'GET',
      responseType: '',
      mimeType: null,
      headers: [],
      data: null
    }, options || {})

    return when.promise(function(resolve, reject) {
      var request = new XMLHttpRequest
      request.open(o.method, url, true)
      request.responseType = o.responseType

      for (var i = 0; i < o.headers.length; i++) {
        request.setRequestHeader( o.headers[i].key, o.headers[i].value )
      }

      if (o.mimeType && request.overrideMimeType) request.overrideMimeType(o.mimeType)

      request.onload = function(e) {
        const result = format( e.currentTarget, o )

        if (e.currentTarget.status >= 200 && e.currentTarget.status < 300 || e.currentTarget.status === 304) {
          resolve(result)
        } else {
          reject({
            status: e.currentTarget.status,
            error: e.currentTarget.statusText,
            request: result
          })
        }
      }

      request.onerror = function() {
        reject({
          status: request.status,
          error: request.statusText,
          request: format( request, o )
        })
      }

      request.send(o.data)
    })
  },

  loadArrayBuffer: function(url, options) {
    return this.load(url, Object.assign({
      responseType: 'arraybuffer'
    }, options || {}))
  },

  loadXML: function(url, options) {
    return this.load(url, Object.assign({
      responseType: 'document',
      mimeType: 'text/xml'
    }, options || {}))
  },

  loadJSON: function(url, options) {
    return this.load(url, Object.assign({
      responseType: 'json',
      mimeType: 'text/json'
    }, options || {}))
  }

}
