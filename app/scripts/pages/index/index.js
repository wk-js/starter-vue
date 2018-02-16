'use strict'

import { CreatePage } from "../../lib/page";
import { Store } from './index-store'
import ApplicationMixin from '../../lib/vue/mixins/application-mixin'

import Example1 from 'sections/example-1/example-1'
import Example2 from 'sections/example-2/example-2'

export default CreatePage('index', {

  data() {
    return {
      id: 'index',
      store: Store
    }
  },

  components: {
    "example-1": Example1,
    "example-2": Example2
  },

  mixins: [ ApplicationMixin ],

  mounted() {
    // Display section
    this.$root.getSectionManager().forceGoTo( this.store.section.default )
  }

})