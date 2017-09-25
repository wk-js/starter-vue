'use strict'

import Assets from './assets.json.ejs'
import { expose } from 'lol/utils/object'

module.exports = expose(Assets, [
  'assets/images/photo.jpg'
])