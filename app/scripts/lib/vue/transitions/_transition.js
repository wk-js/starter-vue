'use strict'

import when from 'when'

const NOOP = function() {}

class Transition {

  constructor( component ) {
    this.component = component
    this.$el       = this.component.$el
  }


  /**
   * @param {String} id
   */
  _call( id ) {
    if (this.component.hasOwnProperty(id)) {
      this.component[id]()
    }
    this.component.$emit( id )
  }


  /**
   * Transition in
   * @return {Promise}
   */
  _in() {
    this.component.visible          = true
    this.component.transition_state = 'transition-in'
    this._call( 'onShow' )
    return when.promise((resolve) => {
      this.in(() => {
        this.component.transition_state = ''
        this._call( 'onShown' )
        resolve()
      })
    })
  }


  /**
   * Transition out
   * @return {Promise}
   */
  _out() {
    this.component.transition_state = 'transition-out'
    this._call( 'onHide' )
    return when.promise((resolve) => {
      this.out(() => {
        this.component.transition_state = ''
        this.component.visible    = false
        this._call( 'onHidden' )
        resolve()
      })
    })
  }

}

Transition.prototype.in  = NOOP
Transition.prototype.out = NOOP

export default Transition