# Test Tools

## These are your test tools:

* helpers - setup and teardown boilerplate
* mock - generat mock data
* polyfil - browser polyfils
* tool - tools to help write tests, mostly used during debugging

## To use:

````javascript
var chai = require('chai'),
expect = chai.expect,
util = require('[hui-components-content/lib/]test');
````
 

# How to Test
1. create spec folder
1. create tests with the name `[fileToBeTested]_test.js`
1. write tests
1. run tests once with `grunt karma:unit`
1. run tests continuously while developing (tests?) with `grunt karma:unit_auto`
1. check code coverage with `grunt karma:unit_coverage`, code coverage should be maintained above 80%.

# Test Tools To Do:
1. automate creating test folders / updating .jshintrc
1. example using mock routes to intercept data
1. example testing directives

# Resources
* Year of Moo: [https://github.com/yearofmoo/angularjs-seed-repo]
* This thread on GitHub: https://github.com/karma-runner/karma-coverage/issues/16
* [https://github.com/thaiat](@thaiat)'s [https://github.com/thaiat/generator-angular-famous-ionic]
