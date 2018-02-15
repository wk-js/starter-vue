'use strict'

import MediaLoader from 'lib/media-loader'
import when from 'when'
import { EventEmitter } from 'events'

class AssetStore extends EventEmitter {

  constructor() {
    super()

    this.mediaLoader = MediaLoader.new()
    this.manifest    = undefined
    this.assets      = {}
    this.device      = null
  }

  getAssets( manifest ) {
    return Object.keys(manifest).map(function( key ) {
      manifest[key].id = key
      return manifest[key]
    })
  }

  load( manifest ) {
    manifest = this._filterManifest( manifest )
    Object.assign(this.assets, manifest)
    const assets = this.getAssets( manifest )
    return this.mediaLoader.load( assets )
  }

  loadFonts( fontManifest ) {
    let $preload = document.querySelector('font-loader')
    $preload     = $preload ? $preload : document.createElement('div')
    $preload.style.cssText = 'opacity: 0; visibility: hidden; pointer-events: none; position: absolute; top: 0;'

    let html = ""

    for (const key in fontManifest) {
      html += `<span style="${fontManifest[key]}">${key}</span>\n`
    }

    $preload.innerHTML = html

    if (!$preload.parentNode) document.body.appendChild( $preload )

    this.$preload = $preload
  }

  getPath( asset_path ) {
    return this.manifest[asset_path] || asset_path
  }

  get( asset_path, async ) {
    const asset = this.assets[asset_path]
    if (async && asset) {
      return asset.promise
    }
    return asset
  }

  getAll( asset_paths, async ) {
    const arr = []
    asset_paths.forEach(function(asset_path) {
      if (this.assets[asset_path]) {
        arr.push(this.assets[asset_path])
      }
    })

    if (async) {
      arr.map(function(asset) {
        return asset.promise
      })
      return when.all(arr)
    }

    return arr
  }

  _filterManifest( manifest ) {
    if (this.device) {
      const mnfst = {}

      for (const key in manifest) {
        if (Array.isArray(manifest[key].devices)) {
          if (manifest[key].devices.indexOf(this.device) !== -1) {
            mnfst[key] = manifest[key]
          }
        } else {
          mnfst[key] = manifest[key]
        }
      }

      return mnfst
    }

    return manifest
  }

}

const _assetStore = new AssetStore
export default_assetStore