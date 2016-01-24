var acorn = require('acorn');
var Timers = require('./timers');

module.exports = function(grunt) {
  function BombDetector(files) {
    this.key = '@timer';
    this.testRegExp = new RegExp(this.key + '\\s', 'i');
    this.dateRegExp = new RegExp(this.key + '\\s+(\\d{4}-\\d{2}-\\d{2})', 'i');
    this.timers = new Timers();
  }

  BombDetector.prototype.parse = function(files) {
    var comments = [], options = {};
    files.forEach(function(file) {
      comments = options.onComment = [];
      acorn.parse(grunt.file.read(file.src), options);
      this.parseComments(file, comments);
    }, this);
  };

  BombDetector.prototype.parseComments = function(file, comments) {
    comments.forEach(function(comment) {
      if (this.isTimer(comment)) {
        this.timers.add(file.src, this.getDateFromTimer(comment));
      }
    }, this);
  };

  BombDetector.prototype.isTimer = function(comment) {
    return this.testRegExp.test(comment.value);
  };

  BombDetector.prototype.getDateFromTimer = function(timer) {
    var result = this.dateRegExp.exec(timer.value);
    return (result !== null) ? new Date(result[1]) : false;
  };

  return BombDetector;
};
