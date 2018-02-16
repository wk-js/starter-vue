'use strict'

import when from 'when'
import EventEmitter from 'eventemitter3'

const DEFAULT_PROMISE = when(true)

const _MANAGERS = {}

export class ComponentManager extends EventEmitter {

  constructor() {
    super()
    this.components = {}
    this.type = 'component'
  }

  new() {
    return new (this._constructor)
  }

  get _constructor() {
    return ComponentManager
  }

  get(id) {
    const component = this.components[id]
    if (!component) {
      console.log('[WARN] Get a '+this.type+' that does not exist:', id)
    }
    return component
  }

  register(id, component, visible) {
    if (!this.components[id]) {
      this.components[id] = component
      visible ? this.forceShow( id ) : this.forceHide( id )
    } else {
      console.log('[WARN] A '+this.type+' with the id "'+id+'" is already registered')
    }
  }


  unregister(id) {
    if (this.components[id]) {
      this.components[id] = null
    } else {
      console.log('[WARN] A '+this.type+' with the id "'+id+'" is not registered')
    }
  }

  show(id, cb) {
    const component = this.get(id)

    if (component && !component.visible) {
      return component.transition._in( cb ).then(function() {
        component.visible = true
      })
    }

    return DEFAULT_PROMISE
  }

  hide(id, cb) {
    const component = this.get(id)
    if (component && component.visible) {
      return component.transition._out( cb ).then(function() {
        component.visible = false
      })
    }

    return DEFAULT_PROMISE
  }

  forceShow(id) {
    const component = this.get(id)

    if (component) {
      component.visible = true
      component.transition._call('onShow')
      component.transition._call('onShown')
    }
  }

  forceHide(id) {
    const component = this.get(id)

    if (component) {
      component.visible = false
      component.transition._call('onHide')
      component.transition._call('onHidden')
    }
  }

  toggle(id) {
    const component = this.get(id)

    if (component) {
      component.visible ? this.hide(id) : this.show(id)
    }
  }

  off() {
    this.removeListener.call(this, arguments)
  }

  static get( id ) {
    return _MANAGERS[ id ]
  }

  static create( id ) {
    return _MANAGERS[ id ] = new ComponentManager()
  }

  static getOrCreate( id ) {
    if (_MANAGERS[ id ]) return _MANAGERS[ id ]
    return _MANAGERS[ id ] = new ComponentManager()
  }

  static delete( id ) {
    delete _MANAGERS[ id ]
  }

}