function Timer(file, date) {
  this.file = file;
  this.date = date;
  this.isBomb = false;
  this.updateIsBomb();
}

Timer.prototype.updateIsBomb = function() {
  if (this.date <= new Date()) {
    this.isBomb = true;
  }
};

module.exports = Timer;