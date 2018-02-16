'use strict'

import EventEmitter from 'eventemitter3'
import when from 'when'

var TYPES = {}

class Loader extends EventEmitter {
  constructor () {
    super()

    this._onFileLoaded = this._onFileLoaded.bind(this)
    this._onFileError = this._onFileError.bind(this)
    this._onComplete = this._onComplete.bind(this)

    this._queue = []
  }

  new () {
    return new Loader()
  }

  addType (type, regexOrCb, cb) {
    TYPES[type] = {}

    let regex = regexOrCb

    if (typeof regexOrCb === 'function') {
      cb = regexOrCb
      regex = null
    }

    TYPES[type].load = cb
    if (regex) TYPES[type].regex = regex
  }

  load (urlOrItemOrArray, doNotIterate = false) {
    // Is an url
    if (typeof urlOrItemOrArray === 'string') {
      this._loadUrl(urlOrItemOrArray)
    }

    // Is an item
    else if (urlOrItemOrArray.hasOwnProperty('type') &&
        urlOrItemOrArray.hasOwnProperty('url')) {
      this._loadItem(urlOrItemOrArray)
    }

    // Is an array
    else if (typeof urlOrItemOrArray.length === 'number') {
      urlOrItemOrArray.forEach((item) => {
        this.load(item, true)
      })
    } else {
      console.log('This content cannot be loaded')
      return false
    }

    if (doNotIterate) return true

    const _queue = this._queue
    this._queue = []
    return {
      manifest: _queue,
      promise: this._startLoading(_queue)
    }
  }

  _loadItem (item) {
    if (item.type) { // && item.url && item.type.match(typesRegExp)) {
      var promise = when.promise(function (resolve, reject, notify) {
        var clean = TYPES[item.type].load(item, function () {
          notify(item)
          resolve(item)
          if (typeof clean === 'function') clean()
        }, function () {
          notify(item)
          reject(item)
          if (typeof clean === 'function') clean()
        })
      })

      item.promise = promise

      this._queue.push(promise)

      return true
    }
    console.log('This item cannot be loaded')
    return false
  }

  _loadUrl (url) {
    var item = { url: url }

    var types = Object.keys(TYPES).map(function (key) {
      return { type: key, regex: TYPES[key].regex }
    })

    for (var i = 0, len = types.length; i < len; i++) {
      if (types[i].regex && url.match(types[i].regex)) {
        item.type = types[i].type
      } else {
        item.type = 'xhr'
      }
    }

    return this._loadItem(item)
  }

  _startLoading (queue) {
    var i = 0
    var count = queue.length
    var scope = this

    return when.all(queue).then(
    scope._onComplete,
    scope._onFileError,
    function (item) {
      i++
      return scope._onFileLoaded(item, i / count)
    })
  }

  _onFileLoaded (item, progress) {
    this.emit('fileloaded', item, progress)
    return { item: item, progress: progress }
  }

  _onFileError (item) {
    this.emit('fileerror', item)
    return item
  }

  _onComplete (items) {
    this.emit('complete', items)
    return items
  }
}

var _loader = new Loader()

/**
 * Image
 */
_loader.addType('image', /.(jpg|jpeg|png|gif)/gi, function (item, onFileLoaded, onFileError) {
  var image = new Image()
  if (item.options && item.options.crossOrigin) image.crossOrigin = item.options.crossOrigin
  image.onload = onFileLoaded
  image.onerror = onFileError
  image.src = item.url
  item.element = image

  return function () {
    image.onload = null
    image.onerror = null
  }
})

/**
 * HTML5 Audio / Video
 */
_loader.addType('media', /.(mp3|ogg|mp4|ogv|webm)/gi, function (item, onFileLoaded, onFileError) {
  const AudioRegExp = /.(mp3|ogg)/gi
  const VideoRegExp = /.(mp4|ogv|webm)/gi

  var media = item.url.match(AudioRegExp) ? document.createElement('audio') : item.url.match(VideoRegExp) ? document.createElement('video') : null

  if (!media) {
    console.log('Element invalid')
    return false
  }

  media.preload = 'auto'
  media.addEventListener('loadedmetadata', onFileLoaded, false)
  media.addEventListener('error', onFileError, false)
  media.src = item.url
  media.load()
  item.element = media

  return function () {
    media.removeEventListener('loadedmetadata', onFileLoaded, false)
    media.removeEventListener('error', onFileError, false)
  }
})

/**
 * Magipack
 */
_loader.addType('magipack', /.(pack)/gi, function (item, onFileLoaded) {
  if (!window.Magipack) {
    console.log('Magipack is not defined')
    return false
  }

  if (!window.Magipacks) {
    window.Magipacks = {}
  }

  var mgpack = new window.Magipack()
  mgpack.onLoadComplete = onFileLoaded
  mgpack.load(item.url, item.jsonFile)
  item.magipack = mgpack
  window.Magipacks[item.id] = mgpack

  return function () {
    mgpack.onLoadComplete = null
  }
})

/**
 * Load XHR
 */
_loader.addType('xhr', function (item, onFileLoaded, onFileError) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', item.url, true)
  xhr.onload = onFileLoaded
  xhr.onerror = onFileError

  if (item.options) {
    Object.assign(xhr, item.options)
  }

  xhr.send(null)
  item.xhr = xhr

  return function () {
    xhr.onload = null
    xhr.onerror = null
  }
})

/**
 * Load howler sound
 */
_loader.addType('howler', function (item, onFileLoaded, onFileError) {
  if (!window.Howl || !window.Howler) {
    console.log('Howler is not defined')
    return false
  }

  const options = item.options || {}

  var sound = new window.Howl(Object.assign({
    src: item.url || item.urls,
    preload: true,
    autoplay: false,
    html5: false,
    onload: onFileLoaded,
    onloaderror: onFileError
  }, options))

  item.sound = sound

  return function () {}
})

export default _loader
