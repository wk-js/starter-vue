'use strict'

/**
 * Vue
 */
import SectionManager from 'lib/vue/managers/section-manager'

/**
 * Template
 */
import DesktopTemplate from './desktop.html'

/**
 * Sections
 */
import Example1 from 'sections/example-1/example-1'
import Example2 from 'sections/example-2/example-2'

export default {
  template: DesktopTemplate,

  components: {
    Example1,
    Example2
  },

  mounted() {
    SectionManager.Shared.goTo('example-1')
  },

  methods:{

  }

}