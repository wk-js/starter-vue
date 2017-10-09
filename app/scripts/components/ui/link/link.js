'use strict'

/**
 * Mixins
 */
import ComponentMixin from 'lib/vue/mixins/component-mixin'

/**
 * Templates
 */
import LinkTemplate from './link.html'


module.exports = {

  template: LinkTemplate,

  mixins: [ ComponentMixin ],

  props: {
    href: {
      type: String,
      default: ''
    }
  },

  mounted() {

  },

  methods: {

    _onClick() {
      if (this.href && this.href.length > 0) {
        window.open(this.href, '_blank')
      }
    }

  }

}