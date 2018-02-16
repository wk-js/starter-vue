'use strict'

import { CreatePage } from "../../lib/page";
import { <%= camelCase %>Store } from './<%= name %>-store'
import PageMixin from '../../lib/vue/mixins/page-mixin'

export default CreatePage('<%= name %>', {

  data() {
    return {
      id: '<%= name %>',
      store: <%= camelCase %>Store
    }
  },

  components: {

  },

  mixins: [ PageMixin ],

  mounted() {
    // Display section
    this.$root.getSectionManager().forceGoTo( this.store.section.default )
  }

})