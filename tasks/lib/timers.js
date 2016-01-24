var Timer = require('./timer');

function Timers() {
  this.items = [];
}

Timers.prototype.add = function(file, date) {
  this.items.push(new Timer(file, date));
};

Timers.prototype.get = function(file, date) {
  return this.items;
};

Timers.prototype.bombs = function() {
  return this.items.filter(function(item) {
    return item.isBomb;
  }, this);
};

module.exports = Timers;