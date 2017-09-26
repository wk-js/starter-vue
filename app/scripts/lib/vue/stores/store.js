'use strict'

const STORE = {
  isDesktop: window.BrowserDetect.isDesktop,
  isMobile: !window.BrowserDetect.isDesktop,

  metrics: {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio
  }
}

export default STORE