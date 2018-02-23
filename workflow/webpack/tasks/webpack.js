'use strict'

const path        = require('path')
const CWD         = process.cwd()
const CLI         = path.join( CWD, 'node_modules', '.bin', 'webpack' )
const SERVER_CLI  = path.join( CWD, 'node_modules', '.bin', 'webpack-dev-server' )
const CONFIG_PATH = path.join( CWD, 'workflow', 'webpack', 'configs' )

const buildPath = function(str) {
  return path.join(CONFIG_PATH, str)
}

desc('[Webpack] Compile files')
task('default', { async: true }, function() {

  const CMD = []

  CMD.push(this.argv.server ? SERVER_CLI : CLI)
  CMD.push('--config')

  if (this.argv.compress) {
    CMD.push(buildPath('build.js'))
  } else {
    CMD.push(this.argv.watch ? buildPath('watch.js') : buildPath('compile.js'))
  }

  if (this.argv.hot) CMD.push('--hot --inline')

  if (this.argv.debug) CMD.push('--display-error-details')

  wk.exec(CMD.join(' ')).then(this.complete).catch(this.fail)

})