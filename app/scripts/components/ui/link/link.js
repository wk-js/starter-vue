'use strict'

/**
 * Mixins
 */
import ComponentMixin from 'lib/vue/mixins/component-mixin'

/**
 * Templates
 */
import LinkTemplate from './link.html'

export default {

  template: LinkTemplate,

  mixins: [ ComponentMixin ],

  props: {
    href: {
      type: String,
      default: ''
    },

    disable: {
      type: Boolean,
      default: false
    }
  },

  mounted () {

  },

  methods: {

    _onClick () {
      if (this.href && this.href.length > 0) {
        window.open(this.href, '_blank')
      }
    }

  }

}
