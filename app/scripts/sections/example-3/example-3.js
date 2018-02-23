'use strict'

import SectionMixin from 'lib/vue/mixins/section-mixin'
import Example3Template from './example-3.html'

export default {

  template: Example3Template,

  data() {
    return {
      id: "example-3"
    }
  },

  mixins: [ SectionMixin ],

  mounted() {

  },

  methods: {

    onShow() {},

    onHide() {},

    onShown() {},

    onHidden() {}

  }

}