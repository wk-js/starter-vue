"use strict"

class Compatibility {

  get getInternetExplorerVersion() {
    var rv = -1;
    var ua;
    var re;
     // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
      ua = navigator.userAgent;
      re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
    } else if (navigator.appName == 'Netscape') {
      ua = navigator.userAgent;
      re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
    }
    return rv;
  }

  get IEVersion() {
    return this.getInternetExplorerVersion
  }

  IECompatible(version) {
    var ver = this.getInternetExplorerVersion;
    if ( ver > -1 ) {
      if ( ver >= version )
        return true;
      else
        return false;
    }

    return false;
  }

  get WebGLSupport() {
    var canvas = document.createElement('canvas');
    var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' :  'supportsContext';
    if (supports in canvas) {
      return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');
    }
    return 'WebGLRenderingContext' in window;
  }

  get isIE() {
    return this.getInternetExplorerVersion > -1
  }

  get isNotIE() {
    return this.getInternetExplorerVersion === -1
  }

  get isSafariIOS() {
    var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );
    return ios && !standalone && safari
  }

  get CanvasSupport() {
    var elem = document.createElement('canvas')
    return !!(elem.getContext && elem.getContext('2d'))
  }

  get isIphone4() {
    return window.BrowserDetect.isIphone && window.screen.height === (960 / 2)
  }

  get isIphone5() {
    return window.BrowserDetect.isIphone && window.screen.height == (1136 / 2)
  }

}

const _compatibility = new Compatibility();
export default _compatibility;