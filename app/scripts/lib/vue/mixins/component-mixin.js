'use strict'

import DefaultTransition from 'lib/vue/transitions/default'

export default {

  data() {
    return {
      visible: true,
      transition_state: ''
    }
  },

  mounted() {
    if (!this.transition) {
      this.transition = new DefaultTransition( this )
    }
  }

}