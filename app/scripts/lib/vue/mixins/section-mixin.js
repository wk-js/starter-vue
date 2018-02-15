'use strict'

import SectionManager from 'lib/vue/managers/section-manager'
import DefaultTransition from 'lib/vue/transitions/default'

export default {

  data() {
    return {
      visible: false,
      transition_state: ''
    }
  },

  mounted() {
    if (!this.transition) {
      this.transition = new DefaultTransition( this )
    }

    SectionManager.register(this.id, this)
  },

  methods: {

    goToSection(id) {
      return SectionManager.goTo(id)
    }

  }

}