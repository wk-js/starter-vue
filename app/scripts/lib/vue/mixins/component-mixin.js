'use strict'

import { FadeTransition } from '../transitions/section-component-transitions/fade-transition'

export default {

  data() {
    return {
      visible: true,
      transition_state: ''
    }
  },

  mounted() {
    if (!this.transition) {
      this.transition = new FadeTransition( this )
    }
  }

}