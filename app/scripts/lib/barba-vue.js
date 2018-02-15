'use strict'

import Vue from 'vue'
import { BaseView, Dispatcher, Pjax } from 'barba.js'
import { bind } from 'lol/utils/function'
import { getLogger } from './utils/logger'

const log = getLogger('BarbaVue')

class BarbaVueManagerPrivate {

  constructor(options) {
    bind(this, '_onNewPageReady')
    this.bvs = {}

    options = Object.assign({
      listenLink: true
    }, options || {})

    this.options = options

    Pjax.bindEvents = (function() {
      if (!options.listenLink) {
        document.addEventListener('click',
          this.onLinkClick.bind(this)
        );
      }

      window.addEventListener('popstate',
        this.onStateChange.bind(this)
      );
    }).bind(Pjax)

    this.Dispatcher = Dispatcher
    this.Pjax       = Pjax
    this.activate()
  }

  activate() {
    Dispatcher.on('newPageReady', this._onNewPageReady)
  }

  desactivate() {
    Dispatcher.off('newPageReady', this._onNewPageReady)
  }

  register( bv ) {
    this.bvs[bv.id] = {
      _isInit: false,
      "barba-vue": bv
    }
  }

  start() {
    Object.keys(this.bvs).forEach((key) => {
      if (!this.bvs[key]._isInit) this.bvs[key]['barba-vue'].init()
    })

    Pjax.start()
  }

  _onNewPageReady(currentStatus, oldStatus, container) {
    if (this.bvs[currentStatus.namespace]) {
      this.bvs[currentStatus.namespace].url = currentStatus.url
      this.bvs[currentStatus.namespace]['barba-vue'].onPageReady( currentStatus, oldStatus, container )
    }
  }

}

export const BarbaVueManager = new BarbaVueManagerPrivate

export class BarbaVue {

  constructor(id, component) {
    bind(this, 'onEnter', 'onEnterCompleted', 'onLeave', 'onLeaveCompleted')

    this.id        = id
    this.component = component

    this.vue   = null
    this.barba = null
  }

  init() {
    this.barba = BaseView.extend({
      namespace:        this.id,

      onEnter: this.onEnter,
      onEnterCompleted: this.onEnterCompleted,

      onLeave: this.onLeave,
      onLeaveCompleted: this.onLeaveCompleted,
    })

    this.barba.init()
  }

  createVue( container ) {
    this.component.el = container.querySelector('.vue-app')
    this.vue = new Vue(this.component)
    this.vue.$emit('onEnter')
  }

  onPageReady( currentStatus, oldStatus, container ) {
    if (!this.vue) this.createVue( container )
  }

  onEnter() {
    log('[Barba] Enter:', this.id)
    if (this.barba.container && this.vue && this.vue._isDestroyed) this.createVue( this.barba.container )
  }

  onEnterCompleted() {
    log('[Barba] Enter Completed:', this.id)
    this.vue.$emit('onEnterCompleted')
  }

  onLeave() {
    log('[Barba] Leave:', this.id)
    this.vue.$emit('onLeave')
  }

  onLeaveCompleted() {
    log('[Barba] Leave Completed:', this.id)
    this.vue.$emit('onLeaveCompleted')
    this.vue.$destroy()
  }

}

export function CreateApp(id, component) {
  return new BarbaVue(id, component)
}