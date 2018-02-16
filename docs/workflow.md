# Workflow

### Module : Git

The module configuration is located at [workflow/modules/git.js](../workflow/modules/git.js)

To enable `git` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/git.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|`git:commit:last`|
|Config|-|
|Data|`infos.commit`|
|Helpers|-|

### Module : Package

The module configuration is located at [workflow/modules/package.js](../workflow/modules/package.js)

To enable `package` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/package.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|-|
|Config|-|
|Data|`infos.version`|
|Helpers|-|

### Module : Environments

The module configuration is located at [workflow/modules/environments.js](../workflow/modules/environments.js)

To enable `environment` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/environments.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|`environment:setup`|
|Config|`environment.env`|
|Data|-|
|Helpers|-|

### Module : I18n

The module configuration is located at [workflow/modules/i18n.js](../workflow/modules/i18n.js)

To enable `i18n` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/i18n.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|`i18n:setup`|
|Config|`i18n.default_locale`, `i18n.locale`, `i18n.locales`, `i18n.load_path`, `i18n.spreadSheetKey`, `i18n.data`|
|Data|`infos.locale`, `i18n.locale`, `i18n.available`, `i18n.data`|
|Helpers|`t`, `translate`, `hasTranslation`|

### Module : EJS

The module configuration is located at [workflow/modules/ejs.js](../workflow/modules/ejs.js)

To enable `ejs` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/ejs.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|`ejs:fetch_data`|
|Config|`ejs.data`, `ejs.options`|
|Data|Every data and helpers of the application|
|Helpers|-|

### Module : AWS

The module configuration is located at [workflow/modules/aws.js](../workflow/modules/aws.js)

To enable `aws` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/aws.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|-|
|Config|`aws.bucket`, `aws.profile`, `aws.region`|
|Data|-|
|Helpers|-|

### Module : Webpack

The module configuration is located at [workflow/modules/webpack.js](../workflow/modules/webpack.js)

To enable `webpack` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/webpack.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|`webpack:setup:entry`|
|Config|`webpack.entry`, `webpack._entry`|
|Data|-|
|Helpers|-|

### Module : Assets

The module configuration is located at [workflow/modules/webpack.js](../workflow/modules/webpack.js)

To enable `webpack` module you have to uncomment this line in [config/application.js](../config/application.js)

```js
// this.module(require('../workflow/modules/webpack.js'))
```

|Type|Additions|
|---|---|
|Configure tasks|`assets:resolve`|
|Config|`assets.load_path`, `assets.destination_path`, `assets.cacheable`, `assets.prefix`, `assets.hash`, `assets.host`, `assets.assets`|
|Data|`assets.*`|
|Helpers|`asset_path(path, relativeTo)`, `asset_url(path, relativeTo)`, `wrap_asset_path(relativeTo)`, `wrap_asset_url(relativeTo)`|