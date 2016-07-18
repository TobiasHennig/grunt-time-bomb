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

    if (timers.length === 0) {
      grunt.log.write('No timers found.')
    } else if (timers.length > 0 && bombs.length === 0) {
      grunt.log.ok('No exploded time bombs found.')
    } else if (bombs.length > 0) {
      grunt.fail.warn('Exploded time bomb found in file: ' + bombs[0].file)
    }
  })
}
