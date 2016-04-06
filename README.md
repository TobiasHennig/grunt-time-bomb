# grunt-time-bomb

> Detect time bombs in source code comments.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-time-bomb --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-time-bomb');
```

## The "time_bomb" task

### Overview

In your script files, add a **@timer** comment with the detonation date. 
```js
// @timer YYYY-MM-DD
function christmasSpecial() {
  ...
}
```

In your project's Gruntfile, add a section named `time_bomb` to the data object passed into `grunt.initConfig()`.
```js
grunt.initConfig({
  time_bomb: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Example

```js
// script.js

// @timer 2016-12-24
function christmasSpecial() {
  ...
}
```

```js
// Gruntfile.js

grunt.initConfig({
  time_bomb: {
    files: ['src/*.js'],
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* [0.1.3] Update peer dependency to support Grunt 1.0, fix #1, #2
* [0.1.0] Initial version
