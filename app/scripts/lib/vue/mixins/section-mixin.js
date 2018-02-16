'use strict'

import { SectionManager } from 'lib/vue/managers/section-manager'
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

    SectionManager.get( this.$root.id ).register(this.id, this)
  },

  methods: {

    goToSection(id) {
      return SectionManager.get( this.$root.id ).goTo(id)
    },

    forceGoToSection(id) {
      return SectionManager.get( this.$root.id ).forceGoTo(id)
    }

  }

}