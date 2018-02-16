'use strict'

import { ComponentManager } from '../managers/component-manager';
import { SectionManager } from "../managers/section-manager";

export default {

  created() {
    SectionManager  .getOrCreate( this.$root.id )
    ComponentManager.getOrCreate( this.$root.id )
  },

  mounted() {
    // Listeners
    SectionManager.get( this.$root.id ).on('change', this._onSectionChange)
  },

  destroyed() {
    SectionManager  .delete( this.$root.id )
    ComponentManager.delete( this.$root.id )
  },

  methods: {

    _onSectionChange(id) {
      this.store.section.current = id
    }

  }

}