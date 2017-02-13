var ottoman = require("ottoman");

//ottoman.bucket = require("./app").bucket;
ottoman.store = require("./index").store;

var PersonModel = ottoman.model("Person", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    name: {
        first: "string",
        last: "string"
    },
    email: "string",
    comments: [{
        ref: "Comment"
    }]
}, {
    index: {
        getByEmail: {
            by: "email"
        }
    }
});

var AnimalModel = ottoman.model("Animal", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    message: "string"
});

module.exports.PersonModel = PersonModel;
module.exports.AnimalModel = CommentModel;
