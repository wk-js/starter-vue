'use strict'

/**
 * Managers
 */
import SectionManager from 'lib/vue/managers/section-manager'

/**
 * Template
 */
import DesktopTemplate from './desktop.html'

/**
 * Sections
 */
import Loading  from 'sections/loading/loading'
import Example1 from 'sections/example-1/example-1'
import Example2 from 'sections/example-2/example-2'

export default {
  template: DesktopTemplate,

  components: {
    Loading,
    Example1,
    Example2
  },

  mounted() {
    SectionManager.forceGo('loading')
  },

  methods:{

  }

}