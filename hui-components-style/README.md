hui-components-style
===============

Base Styles for HDC web.

## To Compile

```bash

$ grunt
```

## Requirements

See [Developers Setup Node and Ruby](https://homesmediasolutions.atlassian.net/wiki/display/HDD/Developers+Setup+Node+and+Ruby).

## Installation

```bash

$ npm install
```

## Troubleshooting

### Error Unresolved Specs from Ruby
```
Warning: WARN: Unresolved specs during Gem::Specification.reset: rb-inotify (>= 0.9) WARN: Clearing out unresolved specs.
```

#### Fix
```bash
$ gem cleanup rb-inotify
```
> This issue should come up less when the env is set up for rvm

http://suranyami.com/post/78524083969/unresolved-specs-during-gem-specification-reset


### Error Compass throws warning in grunt

This is caused by a bug in grunt-contrib-compass and oudated syntax in Foundation

```
    Warning: DEPRECATION WARNING on line 251 of C:\wamp\www\Homes-Portal-UI\clie
nt\scripts\node_modules\bower_components\foundation\scss\foundation\components\_
global.scss:
    Assigning to global variable "$default-float" by default is deprecated.
    In future versions of Sass, this will create a new local variable.
    If you want to assign to the global variable, use "$default-float: left !glo
bal" instead.
    Note that this will be incompatible with Sass 3.2.

    DEPRECATION WARNING on line 252 of C:\wamp\www\Homes-Portal-UI\client\script
s\node_modules\bower_components\foundation\scss\foundation\components\_global.sc
ss:
    Assigning to global variable "$opposite-direction" by default is deprecated.

    In future versions of Sass, this will create a new local variable.
    If you want to assign to the global variable, use "$opposite-direction: righ
t !global" instead.
    Note that this will be incompatible with Sass 3.2.

    DEPRECATION WARNING: The return value of index() will change from "false" to

    "null" in future versions of Sass. For compatibility, avoid using "== false"
 on
    the return value. For example, instead of "@if index(...) == false", just wr
ite
    "@if not index(...)".
            on line  of C:\wamp\www\Homes-Portal-UI\client\scripts\node_modules\
bower_components\foundation\scss\foundation\_functions.scss, in `exports'
            from line 323 of C:\wamp\www\Homes-Portal-UI\client\scripts\node_mod
ules\bower_components\foundation\scss\foundation\components\_global.scss
            from line 9 of C:/wamp/www/Homes-Portal-UI/client/styles/src/scss/ho
mes-ui.scss
    DEPRECATION WARNING on line 13 of C:\wamp\www\Homes-Portal-UI\client\scripts
\node_modules\bower_components\foundation\scss\foundation\_functions.scss:
    Assigning to global variable "$modules" by default is deprecated.
    In future versions of Sass, this will create a new local variable.
    If you want to assign to the global variable, use "$modules: append($modules
, $name) !global" instead.
    Note that this will be incompatible with Sass 3.2. Use --force to continue.

    Aborted due to warnings.
```

### Fix

```diff

diff --git a/client/scripts/node_modules/bower_components/foundation/scss/foundation/components/_global.scss b/client/scripts/node_modules/bower_components/foundation/scss/foundation/components/_global.scss
index d7ff880..6a76070 100644
--- a/client/scripts/node_modules/bower_components/foundation/scss/foundation/components/_global.scss
+++ b/client/scripts/node_modules/bower_components/foundation/scss/foundation/components/_global.scss
@@ -248,8 +248,8 @@
 $default-float: left !default;
 $opposite-direction: right !default;
 @if $text-direction == ltr {
-  $default-float: left;
-  $opposite-direction: right;
+  $default-float: left !global;
+  $opposite-direction: right !global;
 } @else {
   $default-float: right;
   $opposite-direction: left;
diff --git a/client/scripts/node_modules/bower_components/foundation/scss/foundation/_functions.scss b/client/scripts/node_modules/bower_components/foundation/scss/foundation/_functions.scss
index d7ff880..6a76070 100644
--- a/client/scripts/node_modules/bower_components/foundation/scss/foundation/_functions.scss
+++ b/client/scripts/node_modules/bower_components/foundation/scss/foundation/_functions.scss
@@ -9,8 +9,8 @@
 // We use this to prevent styles from being loaded multiple times for compenents that rely on other components. 
 $modules: () !default;
 @mixin exports($name) {
-  @if (index($modules, $name) == false) {
-    $modules: append($modules, $name);
+  @if (not index($modules, $name)) {
+    $modules: append($modules, $name) !global;
     @content;
   }
 }
 
```
