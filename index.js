var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

var app = express();
// Enable CORS for all requests
app.use(cors());

app.use('/mbaas', mbaasExpress.mbaas);
// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));
// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/hello', require('./lib/routes/hello.js')());
app.use('/user', require('./lib/routes/user.js')());

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});

