var express = require("express");
var couchbase = require("couchbase");
var bodyParser = require("body-parser");
var ottoman = require("ottoman");

var app = express();

let d = new Date();
console.log('starting@ ', d.toJSON());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );

var cluster = new couchbase.Cluster("couchbase://localhost");
var bucket = cluster.openBucket("beast-test");
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);
module.exports.bucket = bucket;
module.exports.store = ottoman.store;

// Get routes for app from route dir using index.js to load route files
var routes = require('./routes')(app);

//ottoman.bucket = bucket;
ottoman.ensureIndices(function(error) {
    if (error) {
        console.log(error);
    }
    var server = app.listen(31000, function() {
        console.log("Listening on port %s...", server.address().port);
    });
})
