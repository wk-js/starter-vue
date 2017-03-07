'use strict'

import { EventEmitter } from 'events'

let _lastTouch = 0
let _pinching = false
let _pinchStartDist = 0

function touch(){
  _lastTouch = Date.now()
}

function testTouch(){
  return (Date.now() - _lastTouch) > 5000
}

function setMousePositions(e, coords) {

  let cx = 0, cy = 0, ta

  if (e.touches !== undefined) {
    if( e.touches.length > 0 ) {
      ta = e.touches;
    } else if( e.changedTouches && e.changedTouches.length > 0 ){
      ta = e.changedTouches;
    }
    if( ta ){
      cx=0;
      cy=0;
      for (var i = 0; i < ta.length; i++) {
        cx += ta[i].clientX;
        cy += ta[i].clientY;
      }
      cx/=ta.length;
      cy/=ta.length;
    }
  } else {
    cx = e.clientX
    cy = e.clientY
  }

  coords[0] = cx
  coords[1] = cy
}

function _testPinch( mouse, e ){
  if(e.touches !== undefined && e.touches.length > 1 ) {
    var x = e.touches[0].clientX - e.touches[1].clientX;
    var y = e.touches[0].clientY - e.touches[1].clientY;
    var dist = Math.sqrt( x*x+y*y );

    if( !_pinching ) {
      _pinching = true;
      _pinchStartDist = dist;
      mouse.emit( 'pinchstart' );
    } else {
      var ratio = dist / _pinchStartDist;
      mouse.emit( 'pinch', ratio );
    }
    // e.preventDefault()



  } else {
    _pinching = false
  }
}

class Mouse extends EventEmitter {

  constructor() {
    super()

    const METHODS = [
      '_onMouseMove',
      '_onMouseEnter',
      '_onMouseLeave',
      '_onMouseUp',
      '_onMouseDown',
      '_onMouseWheel',
      '_onTouchStart',
      '_onTouchEnd',
      '_onTouchMove'
    ]
    METHODS.forEach((name) => this[name] = this[name].bind(this))

    this.isOver   = false
    this.isDown   = false
    this.position = new Float32Array(2)
    this.wheel    = new Float32Array(2)
  }

  new() {
    return new Mouse
  }

  activate($el) {
    $el = typeof $el === 'string' ? document.querySelector($el) : $el

    $el.addEventListener( 'mouseenter', this._onMouseEnter )
    $el.addEventListener( 'mousemove' , this._onMouseMove  )
    $el.addEventListener( 'mouseleave', this._onMouseLeave )
    $el.addEventListener( 'mousedown' , this._onMouseDown  )
    $el.addEventListener( 'mouseup'   , this._onMouseUp    )
    $el.addEventListener( 'mousewheel', this._onMouseWheel )

    $el.addEventListener( 'touchmove',  this._onTouchMove  )
    $el.addEventListener( 'touchstart', this._onTouchStart )
    $el.addEventListener( 'touchend',   this._onTouchEnd   )
  }

  desactivate($el) {
    $el = typeof $el === 'string' ? document.querySelector($el) : $el

    $el.removeEventListener( 'mouseenter', this._onMouseEnter )
    $el.removeEventListener( 'mousemove' , this._onMouseMove  )
    $el.removeEventListener( 'mouseleave', this._onMouseLeave )
    $el.removeEventListener( 'mousedown' , this._onMouseDown  )
    $el.removeEventListener( 'mouseup'   , this._onMouseUp    )

    $el.removeEventListener( 'touchmove',  this._onTouchMove  )
    $el.removeEventListener( 'touchstart', this._onTouchStart )
    $el.removeEventListener( 'touchend',   this._onTouchEnd   )
  }

  move(e) {
    this.isOver = true
    setMousePositions(e, this.position)
    this.emit('move', this.position)
  }

  up(e) {
    this.isOver = true
    this.isDown = false
    setMousePositions(e, this.position)
    this.emit('up', this.position)
  }

  down(e) {
    this.isOver = true
    this.isDown = true
    setMousePositions(e, this.position)
    this.emit('down', this.position)
  }

  _onMouseEnter(e) {
    if (testTouch())
      this.isOver = true
      setMousePositions(e, this.position)
      this.emit('enter', this.position)
  }

  _onMouseMove(e) {
    if (testTouch())
      this.move(e)
  }

  _onMouseLeave(e) {
    this.isOver = false
    this.isDown = false
    this.emit('leave', this.position)
  }

  _onMouseDown(e) {
    if (testTouch())
      this.down(e)
  }

  _onMouseUp(e) {
    if (testTouch())
      this.up(e)
  }

  _onMouseWheel(e) {
    this.wheel[0] = e.deltaX
    this.wheel[1] = e.deltaY
    this.emit('wheel', this.wheel)
  }

  _onTouchStart(e) {
    touch()
    this.down( e )

    this.emit('touchdown', this.position)
  }

  _onTouchMove(e) {
    touch()
    this.move( e )
    _testPinch(this, e)
  }

  _onTouchEnd(e) {
    touch()
    this.up( e )
    _testPinch(this, e)

    this.emit('touchup', this.position)
  }

  off() {
    this.removeListener.call(this, arguments)
  }

}


const _mouse = new Mouse
export default _mouse