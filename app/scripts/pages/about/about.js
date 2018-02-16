'use strict'

import { CreatePage } from "../../lib/page";
import { Store } from './about-store'
import PageMixin from '../../lib/vue/mixins/page-mixin'

import Example3 from 'sections/example-3/example-3'

export default CreatePage('about', {

  data() {
    return {
      id: 'about',
      store: Store
    }
  },

  components: {
    "example-3": Example3
  },

  mixins: [ PageMixin ],

  mounted() {
    // Display section
    this.$root.getSectionManager().forceGoTo( this.store.section.default )
  }

})