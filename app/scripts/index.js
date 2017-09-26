import Application from './app'

/**
 * Execute application if the browser is supported
 */
if (
  !window.BrowserDetect.Compatibility.isIE ||
  (window.BrowserDetect.Compatibility.isIE && window.BrowserDetect.Compatibility.IEVersion >= 11)
) {
  Application()
}

/**
 * Display legacy version
 */
else {
  const $legacy = document.getElementById('app-legacy')
  $legacy.style.display = ''
}