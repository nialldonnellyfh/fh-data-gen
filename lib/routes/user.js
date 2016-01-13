var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var userService = require('../services/user-service');
var statusObj = require("../status");

function userRoute(){
  var user = new express.Router();
  user.use(cors());
  user.use(bodyParser());

  user.get('/', function(req, res){
    res.set('Content-Type', 'application/json');
    res.send(userService.getRandom());
  });

  user.get('/generate', function(req, res){
    res.set('Content-Type', 'text/plain');
    if(statusObj.isFinished()){
      var summary = statusObj.generateSummary();
      statusObj.clearStatus();
      res.send(summary);
    }else{
      res.send(insertDataIntoDb(req.query.numberOfRecords));
    }
  });
  return user;
}

var insertDataIntoDb = function(numberOfRecords){
  if(!numberOfRecords){
    numberOfRecords = 1;
  }
  if(numberOfRecords > 2000){
    return "Max number of iterations is 2000";
  }
  setImmediate(function(){
    userService.insert(statusObj, numberOfRecords)
  });
  return "Started inserting data into database. Records: " +
    numberOfRecords + ". Refresh to see if task finished";
};

module.exports = userRoute;
