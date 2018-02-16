# Frontend

### Components

In this workfow, we got 4 component types : Component, Section, Application, Page.

* An `Application` is a classic Vue App created by `new Vue(...)`. Better for non-Pjax content.

* A `Page` is an `Application` with connected with `barba.js` router. Better for Pjax content. [See Source](app/scripts/lib/page.js).

* A `Component` is a classic Vue Component created with a literal object.

* A `Section` is the same as `Component` but it must be unique in the entire application.

### Generate a component

|Generation|Command|Source code|Example|
|---|---|---|---|
|Application|`npm-do wk template <name> application`|[Application template](worflow/template/application)|[MenuApp](app/scripts/sections/menu-app)|
|Page|`npm-do wk template <name> page`|[Page template](worflow/template/page)|[IndexPage](app/scripts/page/index)|
|Component|`npm-do wk template <name> component`|[Component template](worflow/template/component)|[UIButton](app/scripts/components/ui/button)|
|Section|`npm-do wk template <name> section`|[Section template](worflow/template/section)|[Example1Section](app/scripts/sections/example-1)|
|UI|`npm-do wk template <name> ui`|[UI template](worflow/template/ui)|[UIButton](app/scripts/components/ui/button)|

### Setup

You can see setup code [here](app/scripts/app.js)