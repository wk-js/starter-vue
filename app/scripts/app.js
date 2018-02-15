'use strict'

import Vue from 'vue'
import Debug from './debug'
import { bind } from 'lol/utils/function'
import Store from './lib/vue/stores/store'
import { BarbaVueManager } from './lib/barba-vue'

import UIComponents from './components/ui'
// import CoverComponent from './components/cover/cover'
// import CoverChapterComponent from './components/cover-chapter/cover-chapter'
// import CoverCollectionComponent from './components/cover-collection/cover-collection'

import IndexPage from './pages/index/index'
import AboutPage from './pages/about/about'

export class Application {

  constructor() {
    bind(this, 'onDOMContentLoaded', 'onResize', 'onPageChanged')
  }

  onDOMContentLoaded() {
    /**
     * Vue plugins
     */
    // Vue.use( Vuex )

    /**
     * Global data mixin
     */
    Vue.mixin({
      data: function() {
        return {
          store: Store
        }
      }
    })

    /**
     * Need to create a separate mixin for UI Component to get access to global data
     */
    Vue.mixin({
      components: {
        // "cover": CoverComponent,
        // "cover-chapter": CoverChapterComponent,
        // "cover-collection": CoverCollectionComponent,
        ...UIComponents
      }
    })

    // Listen events
    window.addEventListener('resize', this.onResize)
    BarbaVueManager.Dispatcher.on('transitionCompleted', this.onPageChanged)

    // Register pages
    BarbaVueManager.register( IndexPage )
    BarbaVueManager.register( AboutPage )

    // Start
    BarbaVueManager.options.listenLink = false
    BarbaVueManager.start()
  }

  onResize() {
    Store.metrics.width      = window.innerWidth
    Store.metrics.height     = window.innerHeight
    Store.metrics.pixelRatio = window.devicePixelRatio
  }

  onPageChanged( currentStatus ) {
    Store.page.name = currentStatus.namespace
    Store.page.url  = currentStatus.url
  }

}