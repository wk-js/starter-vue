'use strict'

/**
 * Mixins
 */
import SectionMixin from 'lib/vue/mixins/section-mixin'
import SectionManager from 'lib/vue/managers/section-manager'

/**
 * Templates
 */
import Template from './example-1.html'


module.exports = {

  template: Template,

  data() {
    return {
      id: "example-1"
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
      SectionManager.Shared.goTo('example-2')
    }

  }

}