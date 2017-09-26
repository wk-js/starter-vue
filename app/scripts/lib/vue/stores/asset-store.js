'use strict'

import MediaLoader from './media-loader'

class AssetStore {

  constructor() {
    this.mediaLoader = MediaLoader.new()
    MediaLoader.copyTypes(this.mediaLoader)

    this.assets = {}
  }

  new() {
    return new AssetStore
  }

  load( manifest ) {
    Object.assign(this.assets, manifest)

    this.mediaLoader.load( manifest )

    this.mediaLoader._queue.items.forEach((item) => {
      const key = item.url
      if (!this.assets[key]) return

      this.assets[key] = Object.assign(this.assets[key], item)
    })

    return this.mediaLoader.start()
  }

  loadFonts( fontManifest ) {
    let $preload = document.querySelector('font-loader')
    $preload     = $preload ? $preload : document.createElement('div')
    $preload.style.cssText = 'opacity: 0; visibility: hidden; pointer-events: none; position: absolute; top: 0; left: 0;'

    let html = ""

    for (const key in fontManifest) {
      html += `<span style="${fontManifest[key]}">${key}</span>\n`
    }

    $preload.innerHTML = html

    if (!$preload.parentNode) document.body.appendChild( $preload )

    this.$preload = $preload
  }

  get( asset_path, async ) {
    const asset = this.assets[asset_path]
    if (async && asset) {
      return asset.promise
    }
    return asset
  }

}

export default AssetStore