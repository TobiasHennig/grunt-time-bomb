/*
 * grunt-time-bomb
 * https://github.com/tobiashennig/grunt-time-bomb
 *
 * Copyright (c) 2016 Tobias Hennig
 * Licensed under the MIT license.
 */

'use strict'

module.exports = function (grunt) {
  var BombDetector = require('./lib/bomb-detector')(grunt)

  grunt.registerMultiTask('time_bomb', 'Detect time bombs in source code comments.', function () {
    var bd = new BombDetector()
    bd.parse(this.filesSrc)
    var timers = bd.timers.get()
    var bombs = bd.timers.bombs()
    var message = ''

    if (timers.length === 0) {
      grunt.log.write('No timers found.')
    } else if (timers.length > 0 && bombs.length === 0) {
      grunt.log.ok('No exploded time bombs found.')
    } else if (bombs.length > 0) {
      bombs.forEach(function (bomb) {
        message = 'Exploded time bomb found in file: ' + bomb.file
        if (bomb.text) {
          message += ' - ' + bomb.text
        }
        grunt.fail.warn(message)
      }, this)
    }
  })
}
