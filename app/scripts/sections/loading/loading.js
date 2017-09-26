'use strict'

/**
 * Lib
 */
import AssetStore from 'lib/asset-store'
import Manifest from 'consts/manifest'
import RAF from 'lol/raf/raf'
import NC from 'lib/notification-center'

/**
 * Mixins
 */
import SectionMixin from 'lib/vue/mixins/section-mixin'

/**
 * Templates
 */
import LoadingTemplate from './loading.html'


module.exports = {

  template: LoadingTemplate,

  data() {
    return {
      id: "loading",
      progress: 0
    }
  },

  computed: {
    display_progress() {
      return Math.ceil(this.progress * 100)
    }
  },

  mixins: [ SectionMixin ],

  mounted() {

  },

  methods: {

    onShow() {},

    onHide() {},

    onShown() {
      NC.on('update', this._onUpdate)
      RAF.start()
      this.load()
    },

    onHidden() {
      NC.off('update', this._onUpdate)
      RAF.stop()
    },

    _onUpdate() {
      this.progress += (this.store.load.progress - this.progress) * 0.05
    },

    load() {
      const queue = AssetStore.load( Manifest )
      queue.error(this._onLoadError)
      queue.notify(this._onLoadProgress)
      queue.complete(this._onLoadComplete)
      return queue.promise
    },

    _onLoadError(err) {
      console.log(err)
    },

    _onLoadProgress() {
      this.store.load.progress = 0
    },

    _onLoadComplete() {
      this.store.load.loaded   = true
      this.store.load.progress = 1

      setTimeout(() => {
        this.goToSection(this.store.defaultSection)
      }, 2000)
    }

  }

}