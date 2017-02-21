var LocationModel = require("./../models/location_model").LocationModel;

console.log('loading location controller');

module.exports = {

    createLocation: (req, res) => {
        var loc = new LocationModel({
          loctype: req.body.loctype,
          name: req.body.name,
          number: req.body.number,
          street: req.body.street,
          city: req.body.city,  // town = city = village
          county: req.body.county,
          postcode: req.body.postcode,
          //country: { 'string', default: 'GB' },  // Country code.  ISO... whatever Goog uses?
          coordinates: {
            lat: req.body.coordinates.lat,
            long: req.body.coordinates.long
          }
        });
        loc.save( (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.status(201).send('Created: ' + loc.name + '\n' + result);
        });
    },

    getLocation: (req, res) => {
        LocationModel.getById(req.params.id, (error, loc) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(loc);
        })
    },

    getLocations: (req, res) => {
        LocationModel.find({}, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(locs);
        });
    },

    getLocationByName: (req, res) => {
        LocationModel.getByName(req.params.name, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(locs);
        })
    },

    getLocationByCoordinates: (req, res) => {
        console.log('ByCoords - lat: ', lat, ' long: ', req.params.coord)
        LocationModel.getByCoordinates(req.params.coords, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(locs);  //need logic for coordinates nearest
        })
    },

    getLocationByCounty: (req, res) => {
        LocationModel.getByCounty(req.params.county, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(locs);
        })
    },

    getLocationByCity: (req, res) => {
        console.log('getByCity: ', req.params.city);
        LocationModel.getByCity(req.params.city, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            console.log('Locations returned: ', locs);
            res.send(locs);
        })
    },

    getLocationByPostcode: (req, res) => {
        LocationModel.getByPostcode(req.params.postcode, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(locs);
        })
    },

    deleteLocation: (req, res) => {
      LocationModel.getById(req.params.id, (error, loc) => {
          if (error) {
              return res.status(400).send(error);
          }
          loc.remove( (error, result) => {
            if (error) {
              return res.status(400).send(error);
            }
            res.status(202).send('Deleted! ' + loc.name.full);
          })
      })
    }

}
