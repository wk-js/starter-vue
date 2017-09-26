'use strict'

import when from 'when'

const NOOP = function() {}

function once(cb) {
  cb.called = false
  return function $once() {
    if (cb.called) return
    cb.called = true
    cb()
  }
}

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
  _in( next ) {
    next = once(next || NOOP)

    this.component.visible          = true
    this.component.transition_state = 'transition-in'
    this._call( 'onShow' )
    return when.promise((resolve) => {
      this.in(() => {
        this.component.transition_state = ''
        this._call( 'onShown' )
        resolve()
        next()
      }, next)
    })
  }


  /**
   * Transition out
   * @return {Promise}
   */
  _out( next ) {
    next = once(next || NOOP)

    this.component.transition_state = 'transition-out'
    this._call( 'onHide' )
    return when.promise((resolve) => {
      this.out(() => {
        this.component.transition_state = ''
        this.component.visible    = false
        this._call( 'onHidden' )
        resolve()
        next()
      }, next)
    })
  }

  _forceIn() {
    this.component.visible = true
    if (this.forceIn) this.forceIn()
    this.component.transition_state = ''
  }

  _forceOut() {
    if (this.forceOut) this.forceOut()
    this.component.transition_state = ''
    this.component.visible = false
  }

}

Transition.prototype.in  = NOOP
Transition.prototype.out = NOOP

export default Transition