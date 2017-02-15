var ottoman = require('ottoman');

var LocationModel = ottoman.model('Location', {
    type: 'string', //home, yard, ...
    contact_person: {
      ref: 'Person'
    },
    number: 'string',
    street: 'string',
    city: 'string',
    county: 'string',
    postcode: 'string',
    country: 'string', // Country code.  ISO... whatever Goog uses?
    coordinates: {
      lat: 'number',
      long: 'number'
    }
  },
  //Indexeses
  {
      index: {
          getByContactPerson: {
              by: 'contact_person'
          }
          getByCoordinates: {
              by: 'coordinates' // Return list of nearest first?
          }
          getByOwner: {
              by: 'owner'
          }
          getByCity: {
              by: 'city'
          }
      }
});

module.exports.LocationModel = LocationModel;
