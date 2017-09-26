'use strict'

import Vue from 'vue'
import BrowserDetect from './BrowserDetect'
import Compatibility from './Compatibility'
import { TweenLite } from 'gsap'

window.Vue = Vue
window.BrowserDetect = BrowserDetect
window.BrowserDetect.Compatibility = Compatibility