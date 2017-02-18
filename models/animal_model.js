var ottoman = require('ottoman');
//ottoman.store = require('./../beast-api').store;

var AnimalModel = ottoman.model('Animal', {
    patient_since: {type: 'Date', default:function(){return new Date()}}}
    species: 'string',  // Horse, Dog
    name: {
        full: 'string',
        display: 'string'
    },
    breed: 'string',  // use breed picklist in app for consistent strings. Stored in DB
    colour: 'string', // use colour pick list in app to keep consistent strings in DB. Options stored in DB.
    birth: {  // If estimated then date = Y+M+D from epoch ie. date value is age.  Else = birth date.
      date: 'Date',  // Convert to birthdate before Create/Update if contains age ie. estimated
      estimated: { type: 'boolean', default: 'true' }
    },
    size: 'string',  // Can convert to number for hh or cm.
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
          getByFullName: {
              by: 'name.full'
          },
          getByDisplayName: {
              by: 'name.display'
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
