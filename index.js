'use strict'

const Application = require('./workflow/index')
Application.make({
  beforeTask: () => {
    console.log( 'Execute', Application.configure.currentTask )
  }
})