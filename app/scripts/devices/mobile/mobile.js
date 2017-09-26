'use strict'

/**
 * Managers
 */
import SectionManager from 'lib/vue/managers/section-manager'

/**
 * Template
 */
import MobileTemplate from './mobile.html'

/**
 * Sections
 */
import Example1 from 'sections/example-1/example-1'
import Example2 from 'sections/example-2/example-2'

export default {
  template: MobileTemplate,

  components: {
    Example1,
    Example2
  },

  mounted() {
    SectionManager.goTo('example-1')
  },

  methods:{

  }

}