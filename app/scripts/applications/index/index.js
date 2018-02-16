'use strict'

import { createApp } from "lib/application";
import { IndexStore } from './index-store'
import ApplicationMixin from 'lib/vue/mixins/application-mixin'

import Example1 from 'sections/example-1/example-1'
import Example2 from 'sections/example-2/example-2'

export default createApp('index', {

  data() {
    return {
      id: 'index',
      store: IndexStore
    }
  },

  components: {
    "example-1": Example1,
    "example-2": Example2
  },

  mixins: [ ApplicationMixin ],

  mounted() {
    // Display section
    this.getSectionManager().forceGoTo( this.store.section.default )
  }

})