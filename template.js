---
sources:
  - github:wk-js/wkt-web
apis:
  - file
---
addFile('app/**/*')

editFile('package.json', function(c) {
  const content = JSON.parse(c.toString('utf8'))

  content.dependencies["vue"]           = "2.5.13"
  content.dependencies["barba.js"]      = "1.0.0"
  content.dependencies["gsap"]          = "1.20.3"
  content.dependencies["eventemitter3"] = "3.0.1"

  content.browser = content.browser || {}
  content.browser["vue"] = "vue/dist/vue.common"

  return JSON.stringify(content, null, 2)
})