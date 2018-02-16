# Frontend

### Components

hancIn this workfow, we got 4 component types : Application, Page, Component, Section.

#### Application and Page

An `Application` is a classic Vue App created by `new Vue(...)`.

A `Page` is an `Application` connected with `barba.js` router for Pjax content.

To register an application as a page, we have to register it to the `PageManager`. You got an example of pjax and non-pjax content [here](../app/scripts/app.js#L99).

#### Component and Section

A `Component` is a classic Vue Component created with a literal object.

A `Section` is the same as `Component` but it must be unique in the entire application.

### Generate a component

|Generation|Command|Source code|Example|
|---|---|---|---|
|Application|`npm-do wk template <name> application`|[Application template](../worflow/template/application)|[MenuApp](../app/scripts/applications/menu)|
|Page|`npm-do wk template <name> application`|[Application template](../worflow/template/application)|[IndexApp](../app/scripts/applications/index)|
|Component|`npm-do wk template <name> component`|[Component template](../worflow/template/component)|[UIButton](../app/scripts/components/ui/button)|
|Section|`npm-do wk template <name> section`|[Section template](../worflow/template/section)|[Example1Section](../app/scripts/sections/example-1)|
|UI|`npm-do wk template <name> ui`|[UI template](../worflow/template/ui)|[UIButton](../app/scripts/components/ui/button)|

### Setup

You can see setup code [here](../app/scripts/app.js)