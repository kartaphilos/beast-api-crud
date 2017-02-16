var ottoman = require('ottoman');
//ottoman.store = require('./../beast-api').store;

var AnimalModel = ottoman.model('Animal', {
    species: 'string',  // Horse, Dog
    name: {
        full: 'string',
        display: 'string'
    },
    breed: 'string',  // use breed picklist in app for consistent strings. Stored in DB
    colour: 'string', // use colour pick list in app to keep consistent strings in DB. Options stored in DB.
    birth: {
      date: 'Date',
      inferred: { type: 'boolean', default: 'true' } // True if calculated from age entered in app.
    },
    size: 'integer',  // Size in cm - convert to SML for dogs and hands, inches for horses in app.
    activity: 'string', //working, agility, hacking, jumping... - this will change over time.  Does it need a history?
    gender: 'string', // Pick list in app for each animal type
    owner: {
      ref: 'Person'
    },
    vet: {
      ref: 'Person'
    },
    handler: {
      ref: 'Person'
    },
    yard: {
      ref: 'Location'
    },
    flagged: 'boolean', // Is this dangerous or need special handling?
    comments: [{  // Comments on the Animal.
        ref: 'Comment'
    }]
  },
  //Indexeses
  {
      index: {
          getByName: {
              by: 'name'
          },
          getBySpecies: {
            by: 'species'
          }
          /*,
          getByYard: {
              by: 'yard' //will this work on both first & last??
          },
          getByOwner: {
              by: 'owner'
          },
          getByVet: {
              by: 'vet'
          }
          */
      }
});

module.exports.AnimalModel = AnimalModel;
