'use strict'

import ComponentManager from './component-manager'

const NOOP = function() {}

class SectionManager extends ComponentManager {

  constructor() {
    super()
    this.currentSection = null
    this._nextSectionId = null
    this.type = 'section'
  }

  getSection(id) {
    return this.getComponent(id)
  }

  register(section, visible) {
    super.register(section.id, section, visible)
  }

  goTo(id, callback=null) {
    if (this._nextSectionId === id) return

    callback = typeof callback === 'function' ? callback : NOOP

    this._nextSectionId = id

    const scope = this

    if (this.currentSection) {
      return this.hide(this.currentSection.id)
                 .then(function() {
                    scope.currentSection = scope.getComponent(scope._nextSectionId)
                    return scope.show( scope._nextSectionId ).then(function() {
                      scope._nextSectionId = null
                      scope.emit('change', scope.currentSection.id, scope.currentSection)
                    })
                 })
                 .then( callback )
    } else {
      scope.currentSection = scope.getComponent(id)
      return this.show(id)
                .then( callback )
    }
  }

}

const _sectionManager = new SectionManager
SectionManager.Shared = _sectionManager
export default SectionManager