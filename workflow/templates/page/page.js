'use strict'

import { CreatePage } from "../../lib/page";
import { <%= camelCase %>Store } from './<%= name %>-store'
import ApplicationMixin from '../../lib/vue/mixins/application-mixin'

export default CreatePage('<%= name %>', {

  data() {
    return {
      id: '<%= name %>',
      store: <%= camelCase %>Store
    }
  },

  components: {

  },

  mixins: [ ApplicationMixin ],

  mounted() {
    // Display section
    this.$root.getSectionManager().forceGoTo( this.store.section.default )
  }

})