var ottoman = require('ottoman');

var PersonModel = ottoman.model('Person', {
    timestamp: {
        type: 'Date',
        default: function() {
            return new Date();
        }
    },
    name: {
        first: 'string',
        last: 'string',
        display: 'string'
    },
    email: 'string', //Has just one email
    phone: [{
      country-code: 'integer',
      number: 'integer',
      type: 'string' // home, mobile, work, ..
    }],
    home: {
            ref: 'Location'
    },
    billing: {
      ref: 'Location'
    },
    // Have all the person relationships/types in the animal object.  Allows a person to take on many roles for an animal.
    // Automatically allows multiple horses per person
    //animal: [{  // Person can be related to multiple animals.. Do we need a relationship type here (as many-to-many)
    //  role: 'string'  //role for this animal.  Could this be an array of types or just a primary type.
    //  ref: 'Animal' // Animal Object
    //}]
    avatar: '??',  //reference a blob
    comments: [{  // Comments on the person.
        ref: 'Comment'
    }]
},
//Indexeses
{
    index: {
        getByEmail: {
            by: 'email'
        }
        getByName: {
            by: 'name' //will this work on both first & last??
        }
        getByFirstName: {
            by: 'name.first'
        }
    }
});

module.exports.PersonModel = PersonModel;
