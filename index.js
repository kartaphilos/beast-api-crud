var express = require("express");
var couchbase = require("couchbase");
var bodyParser = require("body-parser");
var ottoman = require("ottoman");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cluster = new couchbase.Cluster("couchbase://localhost");
var bucket = cluster.openBucket("example");
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);
module.exports.bucket = bucket;
module.exports.store = ottoman.store;

var routes = require("./routes.js")(app);

//ottoman.bucket = bucket;


ottoman.ensureIndices(function(error) {
    if (error) {
        console.log(error);
    }
    var server = app.listen(3000, function() {
        console.log("Listening on port %s...", server.address().port);
    });
})