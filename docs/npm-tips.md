# NPM Tips

* Do not use package installed globally, prefer package inside the project.
  * You can write `$(npm bin)/<my_package>` (eg.: `$(npm bin)/webpack`)
  * You can create a new task inside `package.json` (eg.: `npm run webpack --watch` with the task `"webpack": "$(npm bin)/webpack"`)
  * You can install `npm i -g github:wk-js/npm-do` and run `npm-do <my_package>` to use the package version of the project(eg.: `npm-do webpack`)

* Precise the `NODE_ENV` to compile/build/watch for a specific environment. (eg.: `NODE_ENV=staging npm start`)

* Precise the `I18N_LOCALE` to compile/build/watch for a specific locale (eg.: `I18N_LOCALE=en npm start`)