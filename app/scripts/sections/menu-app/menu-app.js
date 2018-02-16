'use strict'

/**
 * Mixins
 */
import ApplicationMixin from 'lib/vue/mixins/application-mixin'

export default {

  el: '#menu-app',

  data() {
    return {
      id: "menu-app"
    }
  },

  mixins: [ ApplicationMixin ],

}