'use strict'

import { ComponentManager } from '../managers/component-manager';
import { SectionManager } from "../managers/section-manager";

export default {

  created() {
    SectionManager  .create( this.id )
    ComponentManager.create( this.id )
  },

  mounted() {
    // Listeners
    SectionManager.get( this.id ).on('change', this._onSectionChange)
  },

  destroyed() {
    SectionManager  .delete( this.id )
    ComponentManager.delete( this.id )
  },

  methods: {

    _onSectionChange(id) {
      this.store.section.current = id
    },

    getSectionManager() {
      return SectionManager.get( this.id )
    },

    getComponentManager() {
      return ComponentManager.get( this.id )
    }

  }

}