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
            .then( (result) => {
                console.log('Done: deleting all Locations', result );
                done();
            })
            .catch( (err) => {
                console.err("Couldn't delete Locations", err );
            });
    });

    /* Test the /GET route (with no Locations in DB) */
    describe('TEST: /GET location', () => {
        it('it should GET all the locations', (done) => {
            chai.request(beastapi)
                .get('/location')
                .end( (err, res) => {
                    console.log('GET response: ', res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /* Test the /POST route */
    describe('/POST location', () => {
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
            }
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
});
