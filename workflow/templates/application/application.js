'use strict'

import { createApp } from "lib/application";
import { {%= camelCase %}Store } from './{%= name %}-store'
import ApplicationMixin from 'lib/vue/mixins/application-mixin'

export const {%= camelCase %}App = createApp('{%= name %}', {

  data() {
    return {
      id: '{%= name %}',
      store: {%= camelCase %}Store
    }
  },

  components: {

  },

  mixins: [ ApplicationMixin ],

  mounted() {
    // // Display section
    // this.$root.getSectionManager().forceGoTo( this.store.section.default )
  }

})