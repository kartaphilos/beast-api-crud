var ottoman = require("ottoman");

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
        last: "string",
        display: "string"
    },
    email: "string", //Has just one email
    phone: [{
      country-code: "number",
      number: "number",
      type: "string"
    }],
    home: { //Can have multiple locations
            ref: "Location"
    },
    billing: {
      ref: "Location"
    },
    // Have all the person relationships/types in the animal object.  Allows a person to take on many roles for an animal.
    // Automatically allows multiple horses per person
    //animal: [{  // Person can be related to multiple animals.. Do we need a relationship type here (as many-to-many)
    //  role: "string"  //role for this animal.  Could this be an array of types or just a primary type.
    //  ref: "Animal" // Animal Object
    //}]
    avatar: "??",  //refernce a blob
    comments: [{  // Comments on the person.
        ref: "Comment"
    }]
},
//Indexeses
{
    index: {
        getByEmail: {
            by: "email"
        }
        getByName: {
            by: "name" //will this work on both first & last??
        }
        getByFirstName: {
            by: "name.first"
        }
    }
});

var AnimalModel = ottoman.model("Animal", {
    species: "string",
    name: {
        full: "string",
        display: "string"
    },
    breed: "string",
    colour: "string",
    birth: {
      date: "Date",
      inferred: "Boolean" // Can I ref a Boolean
    },
    size: "string",  // How to reference different types of measurement.  eg hands for horses and SML for dogs??
    activity: "string", //working, agility, hacking, jumping... - this will change over time.  Does it need a history?
    gender: "string", // Does this need a model for each animal type or just keep it free in string?
    owner: {
      ref: "Person"
    },
    vet: {
      ref: "Person"
    },
    handler: {
      ref: "Person"
    },
    yard: {
      ref: "Location"
    },
    flagged: "Boolean", // Is this dangerous or need special handling?
    comments: [{  // Comments on the Animal.
        ref: "Comment"
    }]
  },
  //Indexeses
  {
      index: {
          getByName: {
              by: "name"
          }
          getByYard: {
              by: "yard" //will this work on both first & last??
          }
          getByOwner: {
              by: "owner"
          }
          getByVet: {
              by: "vet"
          }
      }
});

var LocationModel = ottoman.model("Location", {
    type: "string", //home, yard, ...
    contact_person: {
      ref: "Person"
    },
    number: "string",
    street: "string",
    city: "string",
    county: "string",
    postcode: "string",
    country: "string", // Country code.  ISO... whatever Goog uses?
    coordinates: {
      lat: "number",
      long: "number"
    }
  },
  //Indexeses
  {
      index: {
          getByContactPerson: {
              by: "contact_person"
          }
          getByCoordinates: {
              by: "coordinates" // Return list of nearest first?
          }
          getByOwner: {
              by: "owner"
          }
          getByCity: {
              by: "city"
          }
      }
});

var TreatmentModel = ottoman.model("Treatment", {  // Data common to all treaments
    start_time: {  // default to now.  Use this as the ref for date of the treatment
      type: "Date",
      default: function() {
          return new Date();
      }
    },
    finish_time-time: {
      type: "Date"
    },
    therapist: {  // Therapist performing treament
        ref: "Person"
    },
    animal: {  // Animal the treatment is on
      ref: "Animal"
    },
    location: {
      ref: "Location"
    },
    comments: [{  // Comments on the Animal.
        ref: "Comment"
    }],
    recommendations: [{  // Comments on the Animal.
        ref: "Recommendation"
    }],
    warnings: [{  // Comments on the Animal.
        ref: "Warning"
    }],
    proceed: "Boolean", // Able to proceed with treament - ie. passed checks
    signing_person: {
      ref: "Person",
      signature_img: "blob"  // reference to signature image.
    },
    squiggle: {
      ref: "Squiggle"
    },
    treatment_detail: {
      ref: "DetailTreatment"  // How to reference a different detail for each animal type??
    }
});

var CommentModel = ottoman.model("Comment", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    message: "string"
});

var ReccomendationModel = ottoman.model("Recommendation", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    message: "string"
});

var WarningModel = ottoman.model("Warning", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    message: "string"
});

module.exports.PersonModel = PersonModel;
module.exports.AnimalModel = AnimalModel;
module.exports.LocationModel = LocationModel;
module.exports.TreatmentModel = TreatmentModel;
module.exports.CommentModel = CommentModel;
module.exports.ReccomendationModel = ReccomendationModel;
module.exports.WarningModel = WarningModel;
