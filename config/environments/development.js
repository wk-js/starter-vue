'use strict'

module.exports = function( Project ) {

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

  /**
   * Configure asset pipeline part
   */

  /**
   * Asset pipeline
   */
  const AssetPipeline = Project.AssetPipeline

  AssetPipeline.LOAD_PATH = './app'
  AssetPipeline.DST_PATH  = './public'
  AssetPipeline.cacheable = true

  // Keep the same file manifest.json and override it
  AssetPipeline.debug = false
  AssetPipeline.KEEP_MANIFEST_FILE = false
  AssetPipeline.ASSET_KEY = "d0a7637ed4b7327bfb42179d98c09280"

  AssetPipeline.add('assets')

  /**
   * Configure copy part
   */
  AssetPipeline.symlink('assets')

}