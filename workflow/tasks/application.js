desc('resolve')
task('run', { async: true }, function() {
  const Application = require('../index.js')

  if (this.argv.copy) {
    Application.configure.after('assets:resolve', 'assets:move', function() {
      Application.assets.manager.process()
    })
  }

  Application.make()
  .then(this.complete)
  .catch(this.fail)
})