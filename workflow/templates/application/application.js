'use strict'

/**
 * Mixins
 */
import ApplicationMixin from 'lib/vue/mixins/application-mixin'

export default {

  el: '#<%= name %>-app',

  data() {
    return {
      id: "<%= name %>-app"
    }
  },

  mixins: [ ApplicationMixin ],

}