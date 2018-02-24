'use strict'

import Transition from '../../../transition'

export class FadeTransition extends Transition {

  in( complete, next ) {

    TweenLite.fromTo(this.$el, 1, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      onComplete: complete
    })

  }

  out( complete, next ) {

    // Execute next transition for a cross fade
    TweenLite.delayedCall(0, next)

    TweenLite.fromTo(this.$el, 1, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      onComplete: complete
    })

  }

}
