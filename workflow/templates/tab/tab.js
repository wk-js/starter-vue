'use strict'

/**
 * Mixins
 */
import TabMixin from 'lib/vue/mixins/tab-mixin'

/**
 * Templates
 */
import <%= templateName %> from './<%= name %>.html'


module.exports = {

  template: <%= templateName %>,

  data() {
    return {
      id: "<%= name %>"
    }
  },

  mixins: [ TabMixin ],

  mounted() {

  },

  methods: {

    onShow() {},

    onHide() {},

    onShown() {},

    onHidden() {}

  }

}