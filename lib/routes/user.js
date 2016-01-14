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
    res.json(userService.getRandomUser());
  });

  user.get('/generate', function(req, res){
    if(statusObj.isFinished()){
      res.json(statusObj);
      statusObj.clearStatus();
    }else if(statusObj.isInProgress()){
      res.json(statusObj);
    }else{
      insertDataIntoDb(req.query.numberOfRecords);
      res.send(statusObj);
    }
  });
  return user;
}

var insertDataIntoDb = function(numberOfRecords){
  if(!numberOfRecords){
    numberOfRecords = 1;
  }
  statusObj.started = new Date();
  statusObj.total = numberOfRecords;
  setImmediate(function(){
    userService.insert(statusObj)
  });
};

module.exports = userRoute;
