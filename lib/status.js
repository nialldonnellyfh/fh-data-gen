// Represents migration process.
// Contains all process stats

module.exports = {
  started: null,
  finished: null,
  iteration: 0,
  total: null,
  isInProgress: function(){
    return this.started !== null;
  },
  isFinished: function(){
    return this.finished !== null;
  },
  generateStats: function(){
    return "Process in progress\n" +
      "Started: " + this.started + " number of entries inserted" + this.iteration +
      "\n Total number of iterations: " + this.total;
  },
  generateSummary: function(){
    return "Finished on " + this.finished + "\nTotal number of iterations: " + this.iteration + " Refresh page to retry process";
  },
  clearStatus: function(){
    this.started = null;
    this.finished = null;
    this.iteration = 0;
  }
};