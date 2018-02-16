'use strict'

import SectionMixin from 'lib/vue/mixins/section-mixin'
import Example2Template from './example-2.html'

export default {

  template: Example2Template,

  data() {
    return {
      id: "example-2"
    }
  },

  mixins: [ SectionMixin ],

  mounted() {

  },

  methods: {

    onShow() {},

    onHide() {},

    onShown() {},

    onHidden() {},

    onUiBtnClick(){
      this.goToSection('example-1')
    }

  }

}