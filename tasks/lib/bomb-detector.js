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

    files.filter(function(filepath) {
      // Remove nonexistent files (it's up to you to filter or warn here).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      }
      return true;
    }).map(function(filepath) {
      comments = options.onComment = [];
      acorn.parse(grunt.file.read(filepath), options);
      this.parseComments(filepath, comments);
    }, this);
  };

  BombDetector.prototype.parseComments = function(filepath, comments) {
    comments.forEach(function(comment) {
      if (this.isTimer(comment)) {
        this.timers.add(filepath, this.getDateFromTimer(comment));
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
