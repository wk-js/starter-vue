'use strict'

import SectionMixin from 'lib/vue/mixins/section-mixin'
import Example1Template from './example-1.html'

export default {

  template: Example1Template,

  data() {
    return {
      id: "example-1"
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
      this.goToSection('example-2')
    }

  }

}