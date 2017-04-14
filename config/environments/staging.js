'use strict'

module.exports = function( Project ) {

  /**
   * Configure asset pipeline part
   */

  /**
   * Asset pipeline
   */
  const AssetPipeline = Project.AssetPipeline

  AssetPipeline.LOAD_PATH = './app'
  AssetPipeline.DST_PATH  = './dist'
  AssetPipeline.cacheable = true

  // Keep the same file manifest.json and override it
  AssetPipeline.debug = false
  AssetPipeline.KEEP_MANIFEST_FILE = true
  AssetPipeline.ASSET_KEY = "a59612dfb1a58efa5f788a0031efe07d"

  AssetPipeline.add('assets')

  /**
   * Configure copy part
   */
  AssetPipeline.copy('assets')


  /**
   * Configure build
   */

  /**
   * Entries
   */
  Project.entry('styles/index.styl', 'main.css')
  Project.entry('scripts/index.js', 'main.js')
  Project.entry('scripts/vendor/index.js', 'vendor.js')
  Project.entry('views/index.html.ejs', 'index.html', { cache: false })

  // Example submodule
  Project.entry('submodules/example/styles/index.styl', 'example/main.css')
  Project.entry('submodules/example/scripts/index.js', 'example/main.js')
  Project.entry('submodules/example/index.html.ejs', 'example/index.html', { cache: false })
}