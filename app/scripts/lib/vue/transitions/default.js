'use strict'

import Transition from './_transition'

class DefaultTransition extends Transition {

  in( complete ) {

    TweenLite.fromTo(this.$el, 1, {
      autoAlpha: 0
    }, {
      delay: 0.5,
      autoAlpha: 1,
      onComplete: complete
    })

  }

  out( complete ) {

    TweenLite.fromTo(this.$el, 0.5, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      onComplete: complete
    })

  }

}

module.exports = DefaultTransition