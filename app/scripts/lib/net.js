'use strict'

const when = require('when')

function format( request, options ) {
  var response

  if (options.responseType.match(/json/gi) && request.hasOwnProperty('responseText')) {
    response = JSON.parse( request.responseText )
  } else if (options.responseType.match(/json/gi) && typeof request.response === 'string') {
    response = JSON.parse(request.response)
  } else {
    response = request.response
  }

  return response
}

export default {

  load: function(url, options) {
    var o = Object.assign({
      method: 'GET',
      responseType: '',
      mimeType: null,
      headers: {},
      data: null
    }, options || {})

    return when.promise(function(resolve, reject) {
      var request = new XMLHttpRequest
      request.open(o.method, url, true)
      request.responseType = o.responseType

      if (Array.isArray(o.header)) {
        for (var i = 0; i < o.headers.length; i++) {
          request.setRequestHeader( o.headers[i].key, o.headers[i].value )
        }
      } else {
        for (var key in o.headers) {
          request.setRequestHeader( key, o.headers[key] )
        }
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
