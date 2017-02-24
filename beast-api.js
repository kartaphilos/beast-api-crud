var express = require('express');
var couchbase = require('couchbase');
var bodyParser = require('body-parser');
var ottoman = require('ottoman');
var config = require('config');

var app = express();

let d = new Date();
console.log('starting@ ', d.toJSON());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );

var port = config.listen.port;
console.log('Port: ', port);
console.log('Starting: Couchbase: ', config.couchbase.server);
var cluster = new couchbase.Cluster(config.couchbase.server);
console.log('Opening Bucket: ', config.couchbase.bucket);
var bucket = cluster.openBucket(config.couchbase.bucket);

console.log('New Ottoman adapter');
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);
module.exports.bucket = bucket;
module.exports.store = ottoman.store;
console.log('Bucket opened: ', ottoman.bucket._name);

// Get routes for app from route dir using index.js to load route files
var routes = require('./routes')(app);

//ottoman.bucket = bucket;
console.log('Ensure Indexeses');
ottoman.ensureIndices(function(error) {
    if (error) {
        console.log(error);
    }
    var server = app.listen(port, function() {
        console.log('Listening on port %s...', server.address().port);
    });
})

module.exports = app; //To run tests
