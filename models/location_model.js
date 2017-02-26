var ottoman = require('ottoman');

console.log('Loading LocationModel');

var LocationModel = ottoman.model('Location', {
    location_since: { type: 'Date', default: Date.now },
    loctype: 'string', //home, yard, ...
    name: 'string',  // Can be informal name
    number: 'string',
    street: 'string',
    city: 'string',  // town = city = village
    county: 'string',
    postcode: 'string',
    country: { type: 'string', default: 'GB' },  // Country code.  ISO... whatever Goog uses?
    coordinates: {
      lat: 'string',
      long: 'string'
    },
    contact_person: {
      ref: 'Person'
    }
  },
  //Indexeses
  {
      index: {
          getByName: {
            by: 'name'
          },
          getByContactPerson: {
              by: 'contact_person'
          },
          getByCoordinates: {
              type: 'n1ql',
              by: 'coordinates' // Return list of nearest first?
          },
          getByCounty: {
              by: 'county'
          },
          getByCity: {
              by: 'city'
          },
          getByPostcode: {
            by: 'postcode'
          },
          getByLocationType: {
            by: 'loctype'
          }
      }
});

module.exports.LocationModel = LocationModel;
