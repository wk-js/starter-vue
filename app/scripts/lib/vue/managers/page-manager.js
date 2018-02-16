'use strict'

import { Dispatcher, Pjax } from 'barba.js'
import { bind } from 'lol/utils/function'

class PageManagerPrivate {

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

    Pjax.Dom.containerClass = 'page__content'
    Pjax.Dom.wrapperId      = 'page'

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

  goTo( url ) {
    this.Pjax.goTo( url )
  }

  forceGoTo( url ) {
    this.Pjax.forceGoTo( url )
  }

  _onNewPageReady(currentStatus, oldStatus, container) {
    if (this.bvs[currentStatus.namespace]) {
      this.bvs[currentStatus.namespace].url = currentStatus.url
      this.bvs[currentStatus.namespace]['barba-vue'].onPageReady( currentStatus, oldStatus, container )
    }
  }

}

export const PageManager = new PageManagerPrivate
