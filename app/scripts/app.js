'use strict'

import RAF from 'lol/raf/raf'

import SectionManager from 'lib/vue/managers/section-manager'
import AssetStore from 'lib/asset-store'
import Store from 'lib/vue/stores/store'
import I18n from 'lib/i18n'
import NC from 'lib/notification-center'

import DesktopDevice from './devices/desktop/desktop'
import MobileDevice from './devices/mobile/mobile'

import UiComponents from 'components/ui'


export default function Application() {

  /**
   * Global data mixin
   */
  Vue.mixin({
    data: function() {
      return {
        store: Store
      }
    },

    methods: Object.assign({
      asset_url(key) {
        return AssetStore.get(key) ? AssetStore.get(key).asset_url : key
      },

      asset_path(key) {
        return AssetStore.get(key) ? AssetStore.get(key).asset_path : key
      }
    }, I18n)
  })

  /**
   * Need to create a separate mixin for UI Component to get access to global data
   */
  Vue.mixin({
    components: UiComponents
  })

  /**
   * Vue application entry point
   */
  const App = new Vue({
    el: '#app',

    components: {
      "desktop-device": DesktopDevice,
      "mobile-device": MobileDevice
    },

    mounted() {
      // Listen section change
      SectionManager.on('change', this._onSectionChange)

      // Listen window resize
      window.addEventListener('resize', this._onResize)

      // Listen request animation frame
      RAF.subscribe('#app', this._onUpdate)
    },

    render(h) {
      return this.store.isDesktop ?
      h('desktop-device') : h('mobile-device')
    },

    methods: {

      _onUpdate: function(dt, time) {
        NC.emit('update', dt * 0.001, time)
      },

      _onResize: function() {
        this.store.metrics.width      = window.innerWidth
        this.store.metrics.height     = window.innerHeight
        this.store.metrics.pixelRatio = window.devicePixelRatio
      },

      _onSectionChange(id) {
        this.store.currentSection = id
      }

    }
  })

  return App
}