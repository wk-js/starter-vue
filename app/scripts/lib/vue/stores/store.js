'use strict'

const STORE = {
  isDesktop: window.BrowserDetect.isDesktop,
  isMobile: !window.BrowserDetect.isDesktop,

  menuVisible: false,
  learnMoreVisible: false,
}

export default STORE