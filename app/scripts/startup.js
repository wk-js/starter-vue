'use strict'

import NC from './lib/notification-center'
import RAF from './lib/raf'
import SectionManager from './lib/vue/managers/section-manager'

import DesktopDevice from './devices/desktop/desktop'
import MobileDevice from './devices/mobile/mobile'

import UiComponents from 'components/ui'

import Store from './lib/vue/stores/store'

export default function() {

  Vue.mixin({
    data: function() {
      return {
        store: Store
      }
    }
  })

  Vue.mixin({
    components: UiComponents
  })

  new Vue({
    el: document.querySelector('#app'),

    components: {
      "desktop-device": DesktopDevice,
      "mobile-device": MobileDevice
    },

    mounted() {
      RAF.subscribe('#app', this._onUpdate)
      RAF.start()

      SectionManager.Shared.on('change', this._onSectionChange)
    },

    methods: {

      _onUpdate: function(dt, time) {
        NC.$emit('update', dt * 0.001, time)
      },

      _onSectionChange(id) {
        this.store.currentSection = id
      }

    }
  })

}