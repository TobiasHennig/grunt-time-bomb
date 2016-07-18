'use strict';

var path = require('path');
var grunt = require('grunt');
var BombDetector = require('../tasks/lib/bomb-detector')(grunt);

var fixtures = path.join(__dirname, 'fixtures');

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
    this.files = [path.join(fixtures, 'testing.js')];
    this.bd = new BombDetector();
    this.bd.parse(this.files);
    done();
  },
  defaults: function(test) {
    test.expect(10);

    var timers = this.bd.timers.get();
    var bombs = this.bd.timers.bombs();

    test.equal(timers.length, 11, 'should detect all timers');
    test.equal(bombs.length, 10, 'should detect all bombs');

    // @timer 2100-01-01
    test.equal(bombs[0].date.getTime(), new Date('1990-01-01T00:00:00Z').getTime(), 'should detect date');
    test.equal(bombs[0].text, undefined, 'should detect date');

    // @timer 1990-01-01 Text
    test.equal(bombs[5].text, 'Text', 'should detect text');

    // @timer 1990-01-01 12:00
    test.equal(bombs[6].date.getTime(), new Date('1990-01-01T12:00:00Z').getTime(), 'should detect time');

    // @timer 1990-01-01 12:12:12 Text
    test.equal(bombs[8].date.getTime(), new Date('1990-01-01T12:12:12Z').getTime(), 'should detect time with minutes');
    test.equal(bombs[8].text, 'Text', 'should detect text');

    // @timer          1990-01-01       12:00    Text Text
    test.equal(bombs[9].date.getTime(), new Date('1990-01-01T12:00:00Z').getTime(), 'should detect time');
    test.equal(bombs[9].text, 'Text Text', 'should detect text');

    test.done();
  }
};
