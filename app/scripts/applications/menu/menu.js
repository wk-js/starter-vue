'use strict'

import { createApp } from "lib/application";
import { MenuStore } from './menu-store'
import ApplicationMixin from 'lib/vue/mixins/application-mixin'

export default createApp('menu', {

  data() {
    return {
      id: 'menu',
      store: MenuStore
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