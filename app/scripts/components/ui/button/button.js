'use strict'

/**
 * Mixins
 */
import ComponentMixin from 'lib/vue/mixins/component-mixin'

/**
 * Templates
 */
import ButtonTemplate from './button.html'


module.exports = {

  template: ButtonTemplate,

  mixins: [ ComponentMixin ],

  props: {
    className:{
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  },

  mounted() {

  },

  methods: {

    _onClick(e) {
      if (this.href && this.href.length > 0) {
        window.open(this.href, '_blank')
      }
    }

  }

}