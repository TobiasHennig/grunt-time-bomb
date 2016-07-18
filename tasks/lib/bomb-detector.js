var acorn = require('acorn')
var Timers = require('./timers')

module.exports = function (grunt) {
  function BombDetector (files) {
    this.key = '@timer'
    this.testRegExp = new RegExp(this.key + '[^\\w]', 'i')
    this.timers = new Timers()
  }

  BombDetector.prototype.parse = function (files) {
    var comments = []
    var options = {}

    files.filter(function (filepath) {
      // Remove nonexistent files (it's up to you to filter or warn here).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.')
        return false
      }
      return true
    }).map(function (filepath) {
      comments = options.onComment = []
      acorn.parse(grunt.file.read(filepath), options)
      this.parseComments(filepath, comments)
    }, this)
  }

  BombDetector.prototype.parseComments = function (filepath, comments) {
    var timer
    comments.forEach(function (comment) {
      if (this.isTimer(comment.value)) {
        timer = this.parseTimer(filepath, comment.value)
        this.timers.add(timer)
      }
    }, this)
  }

  BombDetector.prototype.isTimer = function (comment) {
    return this.testRegExp.test(comment)
  }

  BombDetector.prototype.parseTimer = function (file, comment) {
    var parts = comment.match(/@timer[^\w]+(\d{4}-\d{2}-\d{2})[ \t]*(\d{2}:\d{2}(?::\d{2})*)*(?:[^\w])*(.*)$/im)
    var timer = {
      file: file,
      date: this.parseDate(parts[1], parts[2]),
      text: this.parseText(parts[3])
    }
    return timer
  }

  BombDetector.prototype.parseDate = function (date, time) {
    var dateTime
    if (!time || time === '') {
      time = '00:00'
    }
    if (time.length === 5) {
      time += ':00'
    }
    dateTime = date + 'T' + time + 'Z'
    return new Date(dateTime)
  }

  BombDetector.prototype.parseText = function (text) {
    if (!text || text === '') {
      text = undefined
    } else {
      text = text.trim()
    }
    return text
  }

  return BombDetector
}
