'use strict'

const webpack           = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path              = require('path')

const EJS_LOADER          = path.join(process.cwd(), 'workflow/webpack/loaders/ejs/ejs-loader.js')
const STYLUS_ASSET_PLUGIN = path.join(process.cwd(), 'workflow/webpack/loaders/stylus/imports/asset')

/**
 * Generate extract rules
 */
const AddExtractRules = function( config, ExtractPlugin ) {

  const entries = Object.keys(config.entry).map(function(key) {
    return path.join(config.context, config.entry[key])
  }).filter(function(entry) {
    return !entry.match(/\.(js)$/)
  })

  const MATCH_ENTRIES = function(regex) {
    return function( entry ) {
      return entry.match(regex) && entries.indexOf(entry) !== -1
    }
  }

  const rules = []

  config.module.rules.forEach(function(rule) {
    const exclude = entries.filter(function(entry) {
      return entry.match(rule.test)
    })

    if (rule.exclude) {
      rule.exclude = Array.isArray(rule.exclude) ? rule.exclude : [rule.exclude]
      rule.exclude = rule.exclude.concat(exclude)
    } else {
      rule.exclude = exclude
    }

    rules.push({
      test: MATCH_ENTRIES(rule.test),
      loader: ExtractPlugin.extract( rule.use ? rule.use.slice(0) : rule.loader )
    })
  })

  config.module.rules = config.module.rules.concat(rules)
}

/**
 *
 */
function getEJSData(prj) {
  const data = {}
  Object.assign(data, prj._datas)
  Object.assign(data, prj._helpers)
  return data
}

/**
 * Exports a config function
 */
function configure( App, options ) {

  const ABSOLUTE_SRC_PATH = App.assets.ABSOLUTE_LOAD_PATH
  const ABSOLUTE_DST_PATH = App.assets.ABSOLUTE_DST_PATH

  const ExtractPlugin = new ExtractTextPlugin("[name]")

  const config = {}

  config.watch   = !!options.watch
  config.cache   = true
  config.context = ABSOLUTE_SRC_PATH
  if (options.sourcemap) config.devtool = 'cheap-eval-source-map'

  config.entry = App.config.webpack.entry

  config.output = {
    path: ABSOLUTE_DST_PATH,
    filename: '[name]',
    chunkFilename: '[id]'
  }

  config.resolve = {
    extensions: [ '.js', '.json' ],
    alias: {
      "components": ABSOLUTE_SRC_PATH + "/scripts/components",
      "consts":     ABSOLUTE_SRC_PATH + "/scripts/consts",
      "devices":    ABSOLUTE_SRC_PATH + "/scripts/devices",
      "lib":        ABSOLUTE_SRC_PATH + "/scripts/lib",
      "sections":   ABSOLUTE_SRC_PATH + "/scripts/sections",
      "vendor":     ABSOLUTE_SRC_PATH + "/scripts/vendor"
    }
  }

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
        test: /\.styl$/,
        include: config.context,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'stylus-loader',
            options: {
              use: [ require(STYLUS_ASSET_PLUGIN)() ]
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
          cacheDirectory: true
        }
      }
    ]
  }

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
    // context: '',
    // modulesSort: '',
    // chunksSort: '',
    // assetsSort: ''
  }

  config.plugins = [
    ExtractPlugin,

    new webpack.LoaderOptionsPlugin({
      options: {
        "ejs": {
          data: getEJSData( App ),
          options: {}
        },
        // "stylus": {
        //   use: [ require(STYLUS_ASSET_PLUGIN)() ]
        // },
        // "babel": {
        //   presets: [ 'es2015' ],
        //   cacheDirectory: true
        // }
      }
    })

  ]

  if (options.compress) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    )
  }

  config.devServer = {
    contentBase: App.assets.ABSOLUTE_DST_PATH,
    host: "0.0.0.0",
    port: 3000,
    inline: true,
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  }

  AddExtractRules( config, ExtractPlugin )

  return config

}

module.exports = function( options ) {
  const App = require(process.cwd() + '/workflow')
  return App.make().then(function() {
    return configure( App, options )
  })
}