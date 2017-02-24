//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

console.log('Running Location tests');

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
    var query = N1qlQuery.fromString('DELETE FROM ' + ottoman.bucket._name + ' WHERE _type="Location"');
    ottoman.bucket.query(query, (err, result) => {
        if (err) return err;
        console.log('Deleting all Location Models ', result);
        console.log('Query: ', query);
        return result;
    });
    return;
}
//Our parent block
describe('Locations', () => {
            beforeEach((done) => { //Before each test we empty the database
                console.log('deleting all Locations');
                deleteAllLocations()
                console.log('Done: deleting all Locations');
                done();
            });

            /*
             * Test the /GET route
             */
            describe('/GET location', () => {
                it('it should GET all the locations', (done) => {
                    chai.request(beastapi)
                        .get('/location')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(0);
                            done();
                        });
                });
            });

            /*
             * Test the /POST route
             */
            describe('/POST location', () => {
                it('it should POST a Location', (done) => {
                    let loc = {
                      loctype: 'yard', //home, yard, ...
                      name: 'mocha POST Test #1',  // Can be informal name
                      number: '1',
                      street: 'Nagster Lane',
                      city: 'Nag upon Hay',  // town = city = village
                      county: 'Straw',
                      postcode: 'XX009YY'
                    }
                    chai.request(beastapi)
                        .post('/location')
                        .send(loc)
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.loc.should.have.property('loctype');
                            res.body.loc.should.have.property('name');
                            res.body.loc.should.have.property('number');
                            res.body.loc.should.have.property('street');
                            res.body.loc.should.have.property('county');
                            res.body.loc.should.have.property('country');
                            res.body.loc.should.have.property('postcode');
                            done();
                        });
                });
            });
    });
