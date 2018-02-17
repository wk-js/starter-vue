'use strict'

import ComponentMixin from 'lib/vue/mixins/component-mixin'
import {%= templateName %} from './{%= name %}.html'

export default {

  template: {%= templateName %},

  mixins: [ ComponentMixin ],

  mounted() {
    // // Listen hooks from section
    // this.$on('onShow', this.onShow)
    // this.$on('onHide', this.onHide)
    // this.$on('onShown', this.onShown)
    // this.$on('onHidden', this.onHidden)
  },

  methods: {
    // onShow() {},
    // onShown() {},
    // onHide() {},
    // onHidden() {}
  }

}