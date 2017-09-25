'use strict'

const AssetPipeline = require('asset-pipeline')

module.exports = function() {
  const AP    = new AssetPipeline
  this.assets = AP

  this.config.assets = {
    resolved: false
  }

  this.helper({
    asset_url(p, base_dir) {
      return AP.getUrl( p, base_dir )
    },

    asset_path(p, base_dir) {
      return AP.getPath( p, base_dir )
    }
  })

  // Add configuration task
  this.configure.after('application:configure', 'assets:resolve', function() {
    // Resolve assets
    if (!this.config.assets.resolved) {
      this.assets.resolve()
      this.config.assets.resolved = true
    } else {
      this.assets._fetchManifest()
    }

    // Pass manifest to data
    this.data('assets', this.assets.CACHE)
  })

}