var ctr = require('./../controllers/location_controller');

console.log('loading location routes');

module.exports = (app) => {

    app.route('/location').post(ctr.createLocation);
    app.route('/location').get(ctr.getLocations);
    app.route('/location/:id').get(ctr.getLocation);
    app.route('/location/byName/:name').get(ctr.getLocationByName);
    app.route('/location/byCounty/:county').get(ctr.getLocationByCounty);
    app.route('/location/byCity/:city').get(ctr.getLocationByCity);
    app.route('/location/byPostcode/:postcode').get(ctr.getLocationByPostcode);
    app.route('/location/byCoordinates/:coords').get(ctr.getLocationByCoordinates);
    app.route('/location/:id').delete(ctr.deleteLocation);

}

console.log('Finished: loading location routes');
