'use strict'

import Vue from 'vue'
import { BaseView } from 'barba.js'
import { bind } from 'lol/utils/function'
import { getLogger } from './utils/logger'
import { template2 } from 'lol/utils/string'
import { clone } from 'lol/utils/object'

const log = getLogger('Application')

const SELECTORS = [ '.vue-app', '#${id}-app', '.${id}-app' ]

export class Application {

  constructor(id, component) {
    bind(this, 'onEnter', 'onEnterCompleted', 'onLeave', 'onLeaveCompleted')

    this.id        = id
    this.component = component

    this.vue   = null
    this.barba = null

    this.isPage = false
  }

  init() {
    this.barba = BaseView.extend({
      namespace:        this.id,

      onEnter: this.onEnter,
      onEnterCompleted: this.onEnterCompleted,

      onLeave: this.onLeave,
      onLeaveCompleted: this.onLeaveCompleted
    })

    this.barba.init()
  }

  createVue( $el ) {
    if (!$el) throw new Error(`No HTMLElement found for the application with id "${this.id}"`)

    if (typeof $el !== 'string' && 'dataset' in $el) {
      this.component.propsData = clone($el.dataset)
    }

    this.component.el = $el
    this.vue = new Vue(this.component)
    this.vue.$emit('onEnter')
  }

  onPageReady( currentStatus, oldStatus, container ) {
    if (container) {
      let $el

      for (let i = 0, ilen = SELECTORS.length; i < ilen; i++) {
        $el = container.querySelector(template2(SELECTORS[i], { id: this.id }))
        if ($el) break;
      }

      this.createVue( $el )
    }
  }

  onEnter() {
    log('[Barba] Enter:', this.id)
    if (this.barba.container && this.vue && this.vue._isDestroyed) this.createVue( this.barba.container.querySelector('.vue-app') )
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

export function createApp(id, component) {
  return new Application(id, component)
}
