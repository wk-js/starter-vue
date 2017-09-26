'use strict'

const STORE = {
  isDesktop: window.BrowserDetect.isDesktop,
  isMobile: !window.BrowserDetect.isDesktop,

  currentSection: null,
  defaultSection: 'example-1',

  metrics: {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio
  },

  load: {
    loading: false,
    loaded: false,
    progress: 0
  }
}

export default STORE