//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

console.log('Running Animal tests');

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
let AnimalModel = require('./../models/animal_model').AnimalModel;

//console.log('store: ', ottoman.store);
console.log('bucket: ', ottoman.bucket._name);

chai.use(chaiHttp);

function deleteAllAnimals() {
    return new Promise((resolve, reject) => {
        console.log('Enterng: Deleting all Animal Models');
        var query = N1qlQuery.fromString('DELETE FROM ' + ottoman.bucket._name + ' WHERE _type="Animal"');
        console.log('Query: ', query);
        ottoman.bucket.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

//Our parent banimalk
describe('Animals', () => {
    beforeEach((done) => { //Before each test we empty the database
        console.log('Prep: deleting all Animals');
        deleteAllAnimals()
            .then((result) => {
                console.log('Done: deleting all Animals', result);
                done();
            })
            .catch((err) => {
                console.err("Couldn't delete Animals", err);
            });
    });

    /* Test the /GET route (with no Animals in DB) */
    describe('TEST: /GET animal', () => {
        it('it should GET all the animals', (done) => {
            chai.request(beastapi)
                .get('/animal')
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
    describe('TEST: /POST animal', () => {
        it('it should POST an Animal', (done) => {
            let animal = {
                name: {
                    full: "Mocha Test Horse",
                    display: "Nag 1"
                },
                birth: {
                    estimated: "true",
                    date: "2013-02-21T17:12:10.380Z"
                },
                species: "horse",
                breed: "test",
                colour: "grey",
                size: "15.1h",
                activity: "winning",
                gender: "gelding"
            };
            chai.request(beastapi)
                .post('/animal')
                .send(animal)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('patient_since');
                    res.body.should.have.property('name');
                    res.body.should.have.property('species');
                    res.body.should.have.property('breed');
                    res.body.should.have.property('colour');
                    res.body.should.have.property('size');
                    res.body.should.have.property('gender');
                    done();
                });
        });
    });

    /* Test the /POST route */
    describe('/GET/animal/:id ', () => {
        it('it should GET an animal by the given id', (done) => {
            let animal = new AnimalModel({
              name: {
                  full: "Mocha Test Horse",
                  display: "Nag 2"
              },
              birth: {
                  estimated: "true",
                  date: "2013-02-21T17:12:10.380Z"
              },
              species: "horse",
              breed: "test",
              colour: "grey",
              size: "15.2h",
              activity: "winning",
              gender: "gelding"
            });
            animal.save((err, res) => {
                console.log('/GET/:id - Created Animal: ', animal);
                chai.request(beastapi)
                    .get('/animal/' + animal._id)
                    .send(animal)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(animal._id);
                        res.body.should.have.property('patient_since');
                        res.body.should.have.property('name');
                        res.body.should.have.property('species');
                        res.body.should.have.property('breed');
                        res.body.should.have.property('colour');
                        res.body.should.have.property('size');
                        res.body.should.have.property('gender');
                        done();
                    });
            });
        });
    });


    describe('/PUT/:id animal', () => {
        it('it should UPDATE an animal given the id', (done) => {
            let animal = new AnimalModel({
              name: {
                  full: "Mocha Test Horse",
                  display: "Nag 3"
              },
              birth: {
                  estimated: "true",
                  date: "2013-02-21T17:12:10.380Z"
              },
              species: "horse",
              breed: "test",
              colour: "grey",
              size: "15.3h",
              activity: "winning",
              gender: "gelding"
            });
            animal.save((err, result) => {
                console.log('PUT animal._id: ', animal._id);
                chai.request(beastapi)
                    .put('/animal/' + animal._id)
                    .send({
                        _id: animal._id,
                        name: {
                            full: "Mocha Test Horse",
                            display: "Nag 3"
                        },
                        birth: {
                            estimated: "true",
                            date: "2013-02-21T17:12:10.380Z"
                        },
                        species: "horse",
                        breed: "test",
                        colour: "grey",
                        size: "15.3h",
                        activity: "testing",
                        gender: "gelding"
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Animal updated!');
                        res.body.animal.should.have.property('activity').eql('testing');
                        done();
                    });
            });
        });
    });

    /* Test the /DELETE/:id route */
    describe('/DELETE/:id animal', () => {
        it('it should DELETE an animal given the id', (done) => {
            let animal = new AnimalModel({
              name: {
                  full: "Mocha Test Horse",
                  display: "Nag 4"
              },
              birth: {
                  estimated: "true",
                  date: "2013-02-21T17:12:10.380Z"
              },
              species: "horse",
              breed: "test",
              colour: "grey",
              size: "15.4h",
              activity: "winning",
              gender: "gelding"
            });
            animal.save((err, result) => {
                chai.request(beastapi)
                    .delete('/animal/' + animal._id)
                    .end((err, res) => {
                        res.should.have.status(202);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Animal successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});
