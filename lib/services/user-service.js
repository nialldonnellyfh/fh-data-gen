var fs = require('fs');
var dummyjson = require('dummy-json');
// Database connection library
var $fh = require('fh-mbaas-api');

// Singleton helper;
var service = {};

// User data template used to generate json code
var userTemplate = fs.readFileSync('templates/user.hbs', {
  encoding: 'utf8'
});

var historyTemplate = fs.readFileSync('templates/history.hbs', {
  encoding: 'utf8'
});

// Very long string;
var historyString = dummyjson.parse(historyTemplate);

var options = {
  "act": "create",
  "type": "users",
  "fields": null
};

service.insert = function(statusObj, numberOfRecords){
  statusObj.total = numberOfRecords;
  var insertHandler = function(err){
    if(err){
      statusObj.started = null;
      console.error("Error " + err);
    }else{
      statusObj.iteration = statusObj.iteration + 1;
      console.log("Inserted record");
    }
  };
  var insertCommand = function(){
    options.fields = JSON.parse(self.getRandom());
    options.fields.history = historyString;
    $fh.db(options, insertHandler);
  };
  var self = this;
  // Async code execution - will block other requests for a while.
  statusObj.started = new Date();
  for(var it = 0; it < numberOfRecords; it++){
    setImmediate(insertCommand);
  }
  setImmediate(function(){
    if(statusObj.started){
      statusObj.finished = new Date();
      console.log("Finished inserting data into database.");
    }else{
      console.log("Problem occurred");
    }
  });
};

service.getRandom = function(){
  return dummyjson.parse(userTemplate);
};

module.exports = service;