'use strict'

import Vue from 'vue'
import { BaseView } from 'barba.js'
import { bind } from 'lol/utils/function'
import { getLogger } from './utils/logger'

const log = getLogger('Page')

export class Page {

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

export function CreatePage(id, component) {
  return new Page(id, component)
}
