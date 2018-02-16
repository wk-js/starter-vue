'use strict'

import { ComponentManager } from '../managers/component-manager';
import { SectionManager } from "../managers/section-manager";
import { PageManager } from '../managers/page-manager'

export default {

  methods: {

    getSectionManager() {
      return SectionManager.get( this.$root.id )
    },

    getComponentManager() {
      return ComponentManager.get( this.$root.id )
    },

    goTo( url ) {
      PageManager.goTo( url )
    },

    forceGoTo( url ) {
      PageManager.goTo( url )
    },

    goToSection(id) {
      return SectionManager.get( this.$root.id ).goTo(id)
    },

    forceGoToSection(id) {
      return SectionManager.get( this.$root.id ).forceGoTo(id)
    }

  }

}