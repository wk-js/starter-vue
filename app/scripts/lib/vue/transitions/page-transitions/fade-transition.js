'use strict'

import { BaseTransition } from 'barba.js'
import { promise } from 'when'

export const FadeTransition = BaseTransition.extend({

  start() {
    document.body.style.pointerEvents = 'none'

    this.newContainerLoading // Loading promise given by barba.js
    .then(this.fadeOut.bind(this))
    .then(this.fadeIn .bind(this))
    .then(this.finish .bind(this))
  },

  finish() {
    document.body.style.pointerEvents = ''
    document.body.scrollTop = 0
    this.done()
  },

  fadeIn() {
    return promise((resolve) => {
      TweenLite.fromTo(this.newContainer, 1, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        onComplete: resolve
      })
    })
  },

  fadeOut() {
    return promise((resolve) => {
      TweenLite.fromTo(this.oldContainer, 1, {
        autoAlpha: 1
      }, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

})