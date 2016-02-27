var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require('fh-mbaas-api');

var userService = require('../services/user-service');
var statusObj = require("../status");

function userRoute(){
  var user = new express.Router();
  user.use(cors());
  user.use(bodyParser());

  user.get('/', function(req, res){
    res.json(userService.getRandomUser());
  });
  
  user.get('/list', function(req, res){
    var options = {
      "act": "list",
      "type": "users" // Entity/Collection name
    };
    $fh.db(options, function (err, data) {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.json(err);
      } else {
        console.log(data);
        res.statusCode = 200;
        res.json(data);
      }
    });
  });

  user.get('/generate', function(req, res){
    if(statusObj.isFinished()){
      res.statusCode = 200;
      res.json(statusObj);
      statusObj.clearStatus();
    }else if(statusObj.isInProgress()){
      res.statusCode = 202;
      res.json(statusObj);
    }else{
      insertDataIntoDb(req.query.numberOfRecords);
      res.statusCode = 202;
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
