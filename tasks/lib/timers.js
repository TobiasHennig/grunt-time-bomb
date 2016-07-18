var Timer = require('./timer')

function Timers () {
  this.items = []
}

Timers.prototype.add = function (data) {
  this.items.push(new Timer(data))
}

Timers.prototype.get = function () {
  return this.items
}

Timers.prototype.bombs = function () {
  return this.items.filter(function (item) {
    return item.isBomb
  }, this)
}

module.exports = Timers
