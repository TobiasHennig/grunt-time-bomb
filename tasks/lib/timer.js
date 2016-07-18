function Timer (data) {
  this.file = data.file
  this.date = data.date
  this.text = data.text
  this.isBomb = false

  this.updateIsBomb()
}

Timer.prototype.updateIsBomb = function () {
  if (this.date <= new Date()) {
    this.isBomb = true
  }
}

module.exports = Timer
