'use strict'

/**
 * Mixins
 */
import SectionMixin from 'lib/vue/mixins/section-mixin'
import SectionManager from 'lib/vue/managers/section-manager'

/**
 * Templates
 */
import Example2Template from './example-2.html'


module.exports = {

  template: Example2Template,

  data() {
    return {
      id: "example-2"
    }
  },

  mixins: [ SectionMixin ],

  mounted() {

  },

  methods: {

    onShow() {},

    onHide() {},

    onShown() {},

    onHidden() {},

    onUiBtnClick(){
      SectionManager.Shared.goTo('example-1')
    }

  }

}