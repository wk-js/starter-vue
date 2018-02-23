'use strict'

const webpack           = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path              = require('path')
const _                 = require( '../utils/utils' )

const EJS_LOADER          = path.join(__dirname, '../loader/ejs/ejs-loader.js')
const STYLUS_ASSET_PLUGIN = path.join(__dirname, '../loader/stylus/imports/asset.js')

/**
 * Exports a config function
 */
function configure( App, OPTIONS ) {

  const ABSOLUTE_SRC_PATH = App.assets.absolute_load_path
  const ABSOLUTE_DST_PATH = App.assets.absolute_dst_path

  const config = {}

  config.context = ABSOLUTE_SRC_PATH
  config.watch   = !!OPTIONS.watch
  config.cache   = true

  // Config: Add sourcemaps
  if (OPTIONS.sourcemap) {
    config.devtool = 'cheap-eval-source-map'
  }

  // Config: Add entry points
  config.entry = App.config('webpack').entry

  // Config: Output
  config.output = {
    path: ABSOLUTE_DST_PATH,
    filename: '[name]',
    chunkFilename: '[id]'
  }

  // Config: Resolve
  config.resolve = {
    extensions: [ '.js', '.js.ejs', '.json', '.json.ejs' ],
    alias: {
      "components":   ABSOLUTE_SRC_PATH + "/scripts/components",
      "sections":     ABSOLUTE_SRC_PATH + "/scripts/sections",
      "applications": ABSOLUTE_SRC_PATH + "/scripts/applications",
      "consts":       ABSOLUTE_SRC_PATH + "/scripts/consts",
      "lib":          ABSOLUTE_SRC_PATH + "/scripts/lib",
      "vendor":       ABSOLUTE_SRC_PATH + "/scripts/vendor"
    }
  }

  // Config: Stats to display
  config.stats = {
    colors: true,
    hash: false,
    version: true,
    timings: true,
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: false,
    chunkOrigins: false
  }

  // Config: Module rules
  config.module = {
    rules: [
      // .ejs
      {
        test: /\.ejs$/,
        enforce: 'pre',
        include: config.context,
        loader: EJS_LOADER
      },

      // .styl
      {
        test: /\.styl(\.ejs)?$/,
        include: config.context,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'stylus-loader',
            options: {
              use: [ require(STYLUS_ASSET_PLUGIN)() ],
              set: {
                "include css": true,
                "compress": OPTIONS.compress
              }
            }
          }
        ]
      },

      // Every raw data
      {
        test: /\.(html|svg|vert|frag|glsl)$/,
        include: config.context,
        use: ['raw-loader']
      },

      // .js
      {
        test: /\.js(\.ejs)?$/,
        include: config.context,
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015' ],
          plugins: [ 'transform-object-rest-spread' ],
          cacheDirectory: true
        }
      }
    ]
  }

  // Config: Dev server configurations
  config.devServer = {
    contentBase: ABSOLUTE_DST_PATH,
    host: "0.0.0.0",
    port: 3000,
    inline: true,
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  }

  // Plugins
  config.plugins = []

  // Plugins: Pass EJS datas
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      "ejs": App.config('ejs')
    }
  }))

  // Plugins: Add extract rules
  const ExtractPlugin = new ExtractTextPlugin("[name]")
  _.AddExtractRules( config, ExtractPlugin )

  config.plugins.push( ExtractPlugin )

  // Plugins: Add Define plugin
  config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`
    }
  }))

  // Plugins: Add compress plugin
  if (OPTIONS.compress) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }))
  }

  return config

}

module.exports = function( options ) {
  const App = require(process.cwd() + '/workflow')
  return App.make().then(function() {
    return configure( App, options )
  })
}