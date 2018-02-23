'use strict'

const { AssetPipeline } = require( 'asset-pipeline/js/asset-pipeline' )
const { relative }  = require( 'path' )

module.exports = function AssetModule() {

  const pipeline = new AssetPipeline
  this.assets = pipeline

  this.config('assets', {})

  this.helper({
    asset_url(p, fromFile) {
      return pipeline.getUrl(p, fromFile)
    },

    asset_path(p, fromFile) {
      return pipeline.getPath(p, fromFile)
    },

    wrap_asset_url(fromFile) {
      fromFile = relative( pipeline.absolute_load_path, fromFile )
      return function asset_url( p ) {
        return pipeline.getUrl(p, fromFile)
      }
    },

    wrap_asset_path(fromFile) {
      fromFile = relative( pipeline.absolute_load_path, fromFile )
      return function asset_path( p ) {
        return pipeline.getPath(p, fromFile)
      }
    }
  })

  this.configure.after('application:configure', 'assets:resolve', () => {
    return pipeline.resolve().then(() => {
      this.config('assets', {
        load_path: pipeline.load_path,
        destination_path: pipeline.dst_path,
        cacheable: pipeline.cacheable,
        prefix: pipeline.prefix,
        hash: pipeline.asset_key,
        host: pipeline.asset_host,
        assets: pipeline.manifest.manifest.assets
      })

      this.data('assets', pipeline.manifest.manifest.assets)
    })
  })

}