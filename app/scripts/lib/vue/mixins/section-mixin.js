'use strict'

import { FadeTransition } from '../transitions/section-component-transitions/fade-transition'

export default {

  data() {
    return {
      visible: false,
      transition_state: ''
    }
  },

  mounted() {
    if (!this.transition) {
      this.transition = new FadeTransition( this )
    }

    this.getSectionManager().register(this.id, this)
  }

}