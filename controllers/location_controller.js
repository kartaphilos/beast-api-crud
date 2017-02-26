var LocationModel = require("./../models/location_model").LocationModel;

//Temp for Testing
var ottoman = require('ottoman');

console.log('loading location controller');

module.exports = {

    createLocation: (req, res) => {
        var loc = new LocationModel({
            loctype: req.body.loctype,
            name: req.body.name,
            number: req.body.number,
            street: req.body.street,
            city: req.body.city,
            county: req.body.county,
            postcode: req.body.postcode,
            coordinates: {
                lat: req.body.coordinates.lat,
                long: req.body.coordinates.long
            }
        });
        loc.save( (error, result) => {
            console.log('POST new Location: loc.save: ', result)
            if (error) {
                return res.status(400).send(error);
            }
            else {
              console.log('LocModel - loc: ', loc);
              res.status(201);
              res.json(loc);
            }
        });
    },

    /** Redo this PUT with Object.assign to compare object values and assign only differences?? **/
    updateLocation: (req, res) => {
        LocationModel.getById(req.params.id, (error, loc) => {
            if (error) {
                return res.status(400).send(error);
            }
            if (req.body._id != loc._id) {
                console.log('_id mismatch');
                return res.status(409).send('_id mismatch');
            }
            for (let key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    let put = req.body[key];
                    let doc = loc[key];
                    if (doc != put) {
                        console.log('Changing ', loc[key], 'to ', put);
                        loc[key] = put;
                        var needSave = true;
                    }
                }
            }
            if (needSave) {
                console.log('saving new loc doc: ', loc);
                loc.save((error, result) => {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    res.status(201).send('Updated: ' + loc.name + '\n' + result);
                });
            } else {
                console.log('No changes in request');
                return res.status(400).send('No changes in request');
            }
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
        console.log('GET locations called');
        //console.log('store', ottoman.store);
        LocationModel.find({}, (error, locs) => {
            if (error) {
                return res.status(400).send(error);
            }
            console.log('GET results locs: ', locs);
            locs = JSON.parse(JSON.stringify(locs));
            console.log('results parsed/stringified locs: ', locs);
            if (locs[0] == null) {
              console.log('GOT [ null ]');
              locs = [];
            }
            //locs = JSON.parse(locs);
            res.status(200).json(locs);
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
            res.send(locs); //need logic for coordinates nearest
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
            loc.remove((error, result) => {
                if (error) {
                    return res.status(400).send(error);
                }
                res.status(202).send('Deleted! ' + loc.name.full);
            })
        })
    }

}
