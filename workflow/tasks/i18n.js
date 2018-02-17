#!/usr/bin/env node
'use strict';

const GoogleSpreadsheet = require("google-spreadsheet");
const FileUtils         = require( 'asset-pipeline/js/utils/fs' )
const { relative }      = require( "path" )


var langs         = []

// ORDER MUST MATCH SPREADSHEET TABS ORDER
var tabs = [
  'global',
  'menu',
  'home',
  'project',
  'm-project',
  'mining',
  'stats',
  'user-stats',
  'faq'
]
var currentTabIdx = -1
var sortedData    = {}
var sheet
var dst_path

function _processTabs() {

  currentTabIdx++

  sheet.getRows( currentTabIdx + 1, function(err, row_data) {

    var tab = tabs[currentTabIdx]

    for ( var i = 0; i < row_data.length; i++ ) {

      var category = row_data[i].category
      if (category === '---' ) continue

      var key = row_data[i].key

      for (var j = 0; j < langs.length; j++) {

        var lang = langs[j]

        if( sortedData[lang][tab][category] === undefined ) sortedData[lang][tab][category] = {}

        sortedData[lang][tab][category][key] = row_data[i][lang.toLowerCase()]

      }

    }

    if ( currentTabIdx < tabs.length - 1 ) {
      _processTabs()
    }
    else {
      _writeToFile()
    }

  }.bind( this ))

}

function _writeToFile() {
  Object.keys( sortedData ).forEach(function(locale) {
    const content = JSON.stringify( sortedData[locale], null, 2 )
    FileUtils.writeFile( content, dst_path + '/' + locale + '.json' )
  })
}





function executeLocales() {

  const Application = require( '../index' )
  const AppConfig   = Application.config('i18n')

  const config  = { langs: AppConfig.locales }
  const key     = AppConfig.spreadSheetKey
  dst_path      = Application.assets.root_path + '/config/locales'
  dst_path      = relative( process.cwd(), dst_path )

  langs         = config.langs

  sheet         = new GoogleSpreadsheet( key )

  // initialize langs and tabs
  for ( var i = 0; i < config.langs.length; i++ ) {
    var lang = config.langs[i]
    sortedData[lang] = {}
    sortedData[lang].lang = lang

    for ( var t = 0; t < tabs.length; t++ ) {
      var tab = tabs[t]
      sortedData[lang][tab] = {}
    }

  }

  _processTabs()

}

task('default', { async: true }, function() {
  const Application = require( '../index' )
  Application
  .make()
  .then(executeLocales)
  .then(this.complete)
  .catch(this.fail)
})