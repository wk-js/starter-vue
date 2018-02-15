'use strict'

import { CreateApp } from "../../lib/barba-vue";

import Example1 from 'sections/example-1/example-1'
import Example2 from 'sections/example-2/example-2'

export default CreateApp('index', {

  data() {
    return {
      id: 'index'
    }
  },

  components: {
    "example-1": Example1,
    "example-2": Example2
  }

})