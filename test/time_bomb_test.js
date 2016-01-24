'use strict';

var grunt = require('grunt');
var BombDetector = require('../tasks/lib/bomb-detector')(grunt);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.time_bomb = {
  setUp: function(done) {
    this.files = [{ src: 'test/fixtures/testing.js' }];
    this.bd = new BombDetector();
    this.bd.parse(this.files);
    done();
  },
  defaults: function(test) {
    test.expect(2);

    var timers = this.bd.timers.get();
    var bombs = this.bd.timers.bombs();

    test.equal(timers.length, 7, 'should detect all timers');
    test.equal(bombs.length, 2, 'should detect all bombs');

    test.done();
  }
};
