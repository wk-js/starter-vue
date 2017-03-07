'use strict'

import when from 'when'
import { EventEmitter } from 'events'

const DEFAULT_PROMISE = when(true)

class ComponentManager extends EventEmitter {

  constructor() {
    super()
    this.components = {}
    this.type = 'component'
  }

  new() {
    return new ComponentManager
  }

  getComponent(id) {
    const component = this.components[id]
    if (!component) {
      console.log('[WARN] Get a '+this.type+' that does not exist:', id)
    }
    return component
  }

  register(id, component, visible=false) {
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

  show(id) {
    const component = this.getComponent(id)

    if (component && !component.visible) {
      return component.transition._in().then(function() {
        component.visible = true
      })
    }

    return DEFAULT_PROMISE
  }

  hide(id) {
    const component = this.getComponent(id)
    if (component && component.visible) {
      return component.transition._out().then(function() {
        component.visible = false
      })
    }

    return DEFAULT_PROMISE
  }

  forceShow(id) {
    const component = this.getComponent(id)

    if (component) {
      component.visible = true
      if (component.forceShow) component.forceShow()
    }
  }

  forceHide(id) {
    const component = this.getComponent(id)

    if (component) {
      component.visible = false
      if (component.forceHide) component.forceHide()
    }
  }

  toggle(id) {
    const component = this.getComponent(id)

    if (component) {
      component.visible ? this.hide(id) : this.show(id)
    }
  }

  // enable(id) {
  //   const component = this.getComponent(id)
  //   component ? component.$mount(component.$el) : void(0)
  // }

  // disable(id) {
  //   const component = this.getComponent(id)
  //   if (component) {
  //     this.hide(id).then(function() {
  //       component.$destroy()
  //     })
  //   }
  // }

  off() {
    this.removeListener.call(this, arguments)
  }
}

const _componentManager = new ComponentManager
ComponentManager.Shared = _componentManager
export default ComponentManager