'use strict'

module.exports = function AWSModule() {

  this.config('aws', {
    bucket: 'BUCKET_NAME',
    profile: 'MY_PROFILE',
    region: 'REGION'
  })

}