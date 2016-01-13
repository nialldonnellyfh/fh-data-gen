// Represents migration process.
// Contains all process stats

module.exports = {
  started: null,
  finished: null,
  iteration: 0,
  total: null,
  isFinished: function(){
    return this.finished !== null;
  },
  generateSummary: function(){
    return "Finished on " + this.finished + "\nTotal number of iterations: " + this.iteration + " Refresh page to retry process";
  },
  clearStatus: function(){
    this.started = null;
    this.finished = null;
  }
};