'use strict'

import { template } from 'lol/utils/string'
import I18nData from '../consts/i18n'

function TEMPLATE_REGEX(key) {
  return new RegExp("\\%\\{"+key+"\\}", 'g')
}

/**
 * Translate
 *
 * @param {String} key
 * @param {Object} obj
 * @returns {String}
 */
function translate(key, obj) {
  const translations = I18nData.data[I18nData.locale]

  let entry  = translations
  const keys = key.split('.')

  keys.forEach((key)=>{
    if (entry && entry[key] !== undefined && entry[key] !== null) {
      entry = entry[key]
    } else {
      entry = null
    }
  })

  if (obj) return template(entry, obj, TEMPLATE_REGEX)

  return entry || key
}

/**
 * Detect translation availability
 *
 * @param {String} key
 * @param {Object} obj
 * @returns {Boolean}
 */
function hasTranslation(key, obj) {
  const value = translate(key, obj)
  return !(!value || value.length === 0 || value === key)
}


/**
 * Create a component with the translation
 *
 * @param {String|Object} tagOrOptions
 * @param {String} key
 * @param {Object} obj
 * @returns {Object}
 */
function translateComponent(tagOrOptions, key, obj) {
  let tag = tagOrOptions, attrs = {}

  if (typeof tagOrOptions == 'string') {
    tag = tagOrOptions
  } else {
    tag   = tagOrOptions.tag
    attrs = tagOrOptions
  }

  const _attrs = Object.keys(attrs).map(function(key) {
    if (key === 'tag') {
      return ''
    }

    return `${key}="${attrs[key]}"`
  }).join(' ')

  return {
    template: `<${tag} ${_attrs}>${translate(key, obj)}</${tag}>`
  }
}

export default {
  t: translate,
  translate: translate,
  tComponent: translateComponent,
  translateComponent: translateComponent,
  hasTranslation: hasTranslation
}