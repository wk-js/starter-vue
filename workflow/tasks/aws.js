'use strict'

const path = require('path')

const EXCEPTIONS = {
  "**/*.js": {
    contentType: "application/javascript"
  },
  "**/*.css": {
    contentType: "text/css"
  },
  "**/*.bin": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.awd": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.ktx": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.dds": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.pvr": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  }
}

task('prepare', { async: true, visible: false }, function() {
  const Application = require( '../index' )
  Application
  .make()
  .then(this.complete)
  .catch(this.fail)
})

desc('[Deploy] GZIP files')
task('gzip', [ 'aws:prepare' ], { async: true }, function() {

  const PR = require( '../index' )

  const cmds = []

  const FL = new wk.FileList.FileList

  for (const key in EXCEPTIONS) {
    if (EXCEPTIONS[key].contentEncoding && EXCEPTIONS[key].contentEncoding.match(/gzip/gi)) {
      FL.include(path.join(PR.assets.absolute_dst_path, key ))
    }
  }

  FL.forEach((f) => {

    const filename = path.basename(f)

    cmds.push({
      cwd: path.dirname(f),
      // command: `gzip -9 -c ${filename} > ${filename}`
      command: `gzip -9 ${filename}`
    })

    cmds.push({
      cwd: path.dirname(f),
      command: `mv ${filename}.gz ${filename}`
    })

  })

  if (process.env.DEBUG) {
    console.log( cmds ); this.complete()
  } else {
    wk.exec(cmds, { sequence: 'serie' }).then(() => {
      print('[DEPLOY]', 'File gzipped')
      this.complete()
    }).catch(this.fail)
  }

})

desc('[Deploy] Push objects')
task('objects', [ 'aws:prepare' ], { async: true }, function() {

  const PR = require( '../index' )

  const excludes = Object.keys(EXCEPTIONS).map(function(exception) {
    return '--exclude="'+ exception +'"'
  }).join(' ')

  const config = PR.data('aws')

  const cmd = [
    'aws s3',
    'sync',
    PR.assets.dst_path,
    `s3://${config.bucket}`,
    '--acl public-read',
    '--output json',
    '--delete',
    `--profile ${config.profile}`,
    `--region ${config.region}`,
    excludes
  ]

  if (process.env.DEBUG) {
    console.log( cmd.join(' ') ); this.complete()
  } else {
    wk.exec(cmd.join(' ')).then(() => {
      print('[DEPLOY]', 'Synchronization finished')
      this.complete()
    }).catch(this.fail)
  }

})

task('exception', [ 'aws:prepare' ], { async: true }, function() {

  const PR = require( '../index' )

  const requests = []
  let request    = []

  const config = PR.data('aws')

  for (const key in EXCEPTIONS) {
    request = [
      'aws s3',
      'sync',
      PR.assets.dst_path,
      `s3://${config.bucket}`,
      '--acl public-read',
      '--output json',
      `--profile ${config.profile}`,
      `--region ${config.region}`
    ]

    if (EXCEPTIONS[key].contentEncoding) {
      request.push( `--content-encoding "${EXCEPTIONS[key].contentEncoding}"` )
    }

    if (EXCEPTIONS[key].contentType) {
      request.push( `--content-type "${EXCEPTIONS[key].contentType}"` )
    }

    request.push(
      '--exclude "*"',
      `--include "${key}"`
    )

    requests.push( request.join(' ') )
  }

  if (process.env.DEBUG) {
    console.log(requests); this.complete()
  } else {
    wk.exec(requests).then(() => {
      print('[DEPLOY]', 'Synchronization finished')
      this.complete()
    }).catch(this.fail)
  }

})


desc(`Deploy to AWS Bucket`)
task('default', [
  'aws:objects',
  'aws:exception'
], { preReqSequence: 'serie' })