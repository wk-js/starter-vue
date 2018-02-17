'use strict'

import SectionMixin from 'lib/vue/mixins/section-mixin'
import {%= templateName %} from './{%= name %}.html'

export default {

  template: {%= templateName %},

  data() {
    return {
      id: "{%= name %}"
    }
  },

  mixins: [ SectionMixin ],

  mounted() {

  },

  methods: {
    // onShow() {},
    // onShown() {},
    // onHide() {},
    // onHidden() {}
  }

}