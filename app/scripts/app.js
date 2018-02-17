'use strict'

import Debug from './debug'
import Vue from 'vue'
// import Vuex from 'vuex'
// import Infos from './consts/infos'
// import LoadingManifest from './consts/loading-manifest'
import { bind } from 'lol/utils/function'
import I18n from './lib/i18n.js'
import CommonMixin from './lib/vue/mixins/common-mixin'
import { AssetStore } from './lib/vue/stores/asset-store'
import { SharedStore } from './lib/vue/stores/shared-store'
import { PageManager } from './lib/vue/managers/page-manager'
import { FadeTransition } from './lib/vue/transitions/page-transitions/fade-transition'
import UIComponents from './components/ui'

/**
 * Applications
 */
import MenuApp  from './applications/menu/menu'
import IndexApp from './applications/index/index'
import AboutApp from './applications/about/about'

/**
 * Implementation
 */
export class Application {
  constructor() {
    bind(this, 'onDOMContentLoaded', 'setup', 'onResize', 'onPageChanged')
  }

  onDOMContentLoaded() {
    // // Redirect to the right language page
    // if (process.env.NODE_ENV !== 'development') {
    //   if ( !window.location.href.match(new RegExp(`/${Infos.locale}`)) ) {
    //     window.location.href = Infos.locale + '/index.html'
    //   }
    // }

    // // Example loading assets
    // const queue = AssetStore.load( LoadingManifest )
    // queue.complete( this.setup )

    this.setup()
  }

  setup() {
    /**
     * Vue plugins
     */
    // Vue.use( Vuex )

    /**
     * Global data mixin
     */
    Vue.mixin({
      data () {
        return {
          I18n: I18n,
          shared_store: SharedStore
        }
      },

      mixins: [ CommonMixin ],

      methods: Object.assign({
        asset_exists(key) {
          return !!AssetStore.get(key)
        },

        asset_url( key ) {
          if (this.asset_exists(key)) {
            return AssetStore.get(key).asset_url
          }

          console.warn(`Asset "${key}" is not found.`)
          return key
        },

        asset_path( key ) {
          if (this.asset_exists(key)) {
            return AssetStore.get(key).asset_path
          }

          console.warn(`Asset "${key}" is not found.`)
          return key
        }
      }, I18n)
    })

    /**
     * Need to create a separate mixin for UI Component to get access to global data
     */
    Vue.mixin({
      components: UIComponents
    })

    // Register current namespace
    const $namespace = document.querySelector('[data-namespace]')
    if ($namespace) {
      SharedStore.page.name = $namespace.getAttribute('data-namespace')
      SharedStore.page.url  = window.location.href
    }

    // Listen events
    window.addEventListener('resize', this.onResize)
    PageManager.Dispatcher.on('transitionCompleted', this.onPageChanged)

    PageManager.Pjax.getTransition = function() {
      return FadeTransition
    }

    // Register applications as pages for Pjax content
    PageManager.register(IndexApp)
    PageManager.register(AboutApp)

    // Create directly the App for non-Pjax content
    MenuApp.createVue()

    // Start
    PageManager.options.listenLink = false
    PageManager.start()
  }

  onResize() {
    SharedStore.metrics.width = window.innerWidth
    SharedStore.metrics.height = window.innerHeight
    SharedStore.metrics.pixelRatio = window.devicePixelRatio
  }

  onPageChanged(currentStatus) {
    SharedStore.page.name = currentStatus.namespace
    SharedStore.page.url = currentStatus.url
  }
}
