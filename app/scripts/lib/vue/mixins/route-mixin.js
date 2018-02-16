'use strict'

import { PageManager } from '../managers/page-manager'

export default {

  methods: {

    routeTo( url ) {
      PageManager.goTo( url )
    }

  }

}