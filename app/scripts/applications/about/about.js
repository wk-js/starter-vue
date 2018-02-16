'use strict'

import { createApp } from "lib/application";
import { AboutStore } from './about-store'
import ApplicationMixin from 'lib/vue/mixins/application-mixin'

import Example3 from 'sections/example-3/example-3'

export default createApp('about', {

  data() {
    return {
      id: 'about',
      store: AboutStore
    }
  },

  components: {
    "example-3": Example3
  },

  mixins: [ ApplicationMixin ],

  mounted() {
    // Display section
    this.getSectionManager().forceGoTo( this.store.section.default )
  }

})