//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

console.log('Running Location tests');

let Promise = require('promise');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

// Require the subject to test?
console.log('requring ./../beast-api');
let beastapi = require('./../beast-api');
console.log('finished requiring');

let ottoman = require('ottoman');
let couchbase = require('couchbase');
let N1qlQuery = couchbase.N1qlQuery;
let LocationModel = require('./../models/location_model').LocationModel;

//console.log('store: ', ottoman.store);
console.log('bucket: ', ottoman.bucket._name);

chai.use(chaiHttp);

function deleteAllLocations() {
    return new Promise((resolve, reject) => {
        console.log('Enterng: Deleting all Location Models');
        var query = N1qlQuery.fromString('DELETE FROM ' + ottoman.bucket._name + ' WHERE _type="Location"');
        console.log('Query: ', query);
        ottoman.bucket.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

//Our parent block
describe('Locations', () => {
    beforeEach((done) => { //Before each test we empty the database
        console.log('Prep: deleting all Locations');
        deleteAllLocations()
            .then((result) => {
                console.log('Done: deleting all Locations', result);
                done();
            })
            .catch((err) => {
                console.err("Couldn't delete Locations", err);
            });
    });

    /* Test the /GET route (with no Locations in DB) */
    describe('TEST: /GET location', () => {
        it('it should GET all the locations', (done) => {
            chai.request(beastapi)
                .get('/location')
                .end((err, res) => {
                    console.log('GET response: ', res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /* Test the /POST route */
    describe('TEST: /POST location', () => {
        it('it should POST a Location', (done) => {
            let loc = {
                loctype: 'yard', //home, yard, ...
                name: 'mocha POST Test #1', // Can be informal name
                number: '1',
                street: 'Nagster Lane',
                city: 'Nag upon Hay', // town = city = village
                county: 'Straw',
                postcode: 'XX009YY',
                coordinates: {
                    lat: '50.0000N',
                    long: '1.0000W'
                }
            };
            chai.request(beastapi)
                .post('/location')
                .send(loc)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('loctype');
                    res.body.should.have.property('name');
                    res.body.should.have.property('number');
                    res.body.should.have.property('street');
                    res.body.should.have.property('county');
                    res.body.should.have.property('country');
                    res.body.should.have.property('postcode');
                    done();
                });
        });
    });

    /* Test the /POST route */
    describe('/GET/location/:id ', () => {
        it('it should GET a location by the given id', (done) => {
            let loc = new LocationModel({
              loctype: 'yard',
              name: 'Mocha POST Test #2',
              number: '2',
              street: 'Nagster Lane',
              city: 'Nag upon Hay',
              county: 'Straw',
              postcode: 'XX009YY',
              coordinates: {
                  lat: '50.0000N',
                  long: '2.0000W'
              }
            });
            loc.save((err, res) => {
                console.log('/GET/:id - Created Loc: ', loc);
                chai.request(beastapi)
                    .get('/location/' + loc._id)
                    .send(loc)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('loctype');
                        res.body.should.have.property('name');
                        res.body.should.have.property('number');
                        res.body.should.have.property('street');
                        res.body.should.have.property('_id').eql(loc._id);
                        done();
                    });
            });
        });
    });


    describe('/PUT/:id location', () => {
        it('it should UPDATE a location given the id', (done) => {
            let loc = new LocationModel({
              loctype: 'yard',
              name: 'Mocha POST Test #3',
              number: '3',
              street: 'Nagster Lane',
              city: 'Nag upon Hay',
              county: 'Straw',
              postcode: 'XX009YY',
              coordinates: {
                  lat: '50.0000N',
                  long: '3.0000W'
              }
            });
            loc.save((err, result) => {
                console.log('PUT loc._id: ', loc._id);
                chai.request(beastapi)
                    .put('/location/' + loc._id)
                    .send({
                      _id: loc._id,
                      loctype: 'home',
                      name: 'Mocha POST Test #3',
                      number: '3',
                      street: 'Nagster Lane',
                      city: 'Nag upon Hay',
                      county: 'Straw',
                      postcode: 'XX009YY',
                      coordinates: {
                          lat: '50.0000N',
                          long: '3.0000W'
                      }
                    })
                    .end( (err, res) => {
                        console.log('PUT end res: ', res);
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Location updated!');
                        res.body.loc.should.have.property('loctype').eql('home');
                        done();
                    });
            });
        });
    });

    /* Test the /DELETE/:id route */
    describe('/DELETE/:id location', () => {
        it('it should DELETE a location given the id', (done) => {
            let loc = new LocationModel({
              loctype: 'yard',
              name: 'Mocha POST Test #4',
              number: '4',
              street: 'Nagster Lane',
              city: 'Nag upon Hay',
              county: 'Straw',
              postcode: 'XX009YY',
              coordinates: {
                  lat: '50.0000N',
                  long: '4.0000W'
              }
            });
            loc.save((err, result) => {
                chai.request(beastapi)
                    .delete('/location/' + loc._id)
                    .end((err, res) => {
                        res.should.have.status(202);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Location successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});
