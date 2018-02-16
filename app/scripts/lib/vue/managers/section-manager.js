'use strict'

import when from 'when'
import { ComponentManager } from './component-manager'

const _MANAGERS = {}

export class SectionManager extends ComponentManager {

  constructor() {
    super()
    this._next = this._next.bind(this)

    this.currentSection = null
    this._nextSectionId = null
    this.type = 'section'

    this.transitioning = false
  }

  get _constructor() {
    return SectionManager
  }

  goTo(id) {
    if (this._nextSectionId === id || !this.get(id) || (this.currentSection && this.currentSection.id === id)) return when(true)
    if (this.transitioning) return when(true)

    this.transitioning = true

    this._nextSectionId = id

    const scope = this

    const current = scope.currentSection ? scope.currentSection : null
    const currID  = current ? current.id : null

    scope.emit('change', this._nextSectionId, currID)

    if (this.currentSection) {
      return this.hide(this.currentSection.id, () => {
        return scope.show( scope._nextSectionId )
                    .then( scope._next )
      })
    }

    return this.show(id, scope._next)
  }

  forceGoTo(id) {
    if (this._nextSectionId === id || !this.get(id) || (this.currentSection && this.currentSection.id === id)) return
    if (this.transitioning) return when(true)

    if (this.currentSection) this.forceHide(this.currentSection.id)

    this._nextSectionId = id
    this._next()

    this.forceShow(this.currentSection.id)
  }

  _next() {
    const previous = this.currentSection ? this.currentSection : null
    const prevID   = previous ? previous.id : null

    this.currentSection = this.get(this._nextSectionId)
    this._nextSectionId = null

    const current = this.currentSection ? this.currentSection : null
    const currID  = current ? current.id : null

    this.emit('changed', currID, prevID)

    this.transitioning = false
  }

  static get( id ) {
    return _MANAGERS[ id ]
  }

  static create( id ) {
    return _MANAGERS[ id ] = new SectionManager()
  }

  static getOrCreate( id ) {
    if (_MANAGERS[ id ]) return _MANAGERS[ id ]
    return _MANAGERS[ id ] = new SectionManager()
  }

  static delete( id ) {
    if (_MANAGERS[ id ]) {
      delete _MANAGERS[ id ]
    }
  }

}