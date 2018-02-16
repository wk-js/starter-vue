import Assets from './manifest.json.ejs'
import { expose } from 'lol/utils/object'

export default expose(Assets, [
  'assets/images/photo.jpg'
])