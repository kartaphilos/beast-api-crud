var Promise = require( 'promise' );

var AnimalModel = require("./../models/animal_model").AnimalModel;

console.log('loading animal controller');

function calcBirthDate(r) {
    console.log('calculating birth date');
    console.log('estimated: ', r.body.birth.estimated);
    let bd = r.body.birth.date;
    if (r.body.birth.estimated) {
        console.log('using age to get birthdate');
        agedate = new Date(bd);
        console.log('agedate: ', agedate);
        now = new Date();
        console.log('now: ', now);
        year = now.getUTCFullYear() - (agedate.getUTCFullYear() - 1970);
        console.log('year: ', year);
        agedate = new Date(now.setUTCFullYear(year));
        console.log('dob: ', agedate);
        bd = (new Date(now.setUTCFullYear(year))).toISOString();
    }
    console.log('bd: ', bd);
    return bd;
}

function pgetByFullName(n) {
  console.log('Promise-FullName: ', n);
  return new Promise( (resolve, reject) => {
    console.log('Calling Ottoman for Display Name');
    AnimalModel.getByFullName(n, (error, beasts) => {
        if (error) {
          console.log('Error in pFull: ', error);
          reject(error);
        }
        else {
          console.log('Full beasts: ', beasts);
          resolve(beasts);
        }
    });
  });
}

function pgetByDisplayName(n) {
  console.log('Promise-DisplayName: ', n);
  return new Promise( (resolve, reject) => {
    console.log('Calling Ottoman for Display Name');
    AnimalModel.getByDisplayName(n, (error, beasts) => {
        if (error) {
          console.log('Error in pDisplay: ', error);
          reject(error);
        }
        else {
          console.log('Display beasts: ', beasts);
          resolve(beasts);
        }
    });
  });
}

module.exports = {

    createAnimal: (req, res) => {
        var beast = new AnimalModel({
            species: req.body.species,
            name: {
                full: req.body.name.full,
                display: req.body.name.display // ToDo: Logic to autogenerate display from full
            },
            breed: req.body.breed,
            colour: req.body.colour,
            size: req.body.size,
            activity: req.body.activity,
            gender: req.body.gender,
            birth: {
                estimated: req.body.birth.estimated,
                date: calcBirthDate(req)
            }
        });
        beast.save((error, result) => {
            if (error) {
                return res.status(400).send(error);
            } else {
              res.status(201)
              res.json(beast);
            }
        });
    },

    getAnimal: (req, res) => {
        AnimalModel.getById(req.params.id, (error, beast) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(beast);
        })
    },

    getAnimals: (req, res) => {
        AnimalModel.find({}, (error, beasts) => {
            if (error) {
                return res.status(400).send(error);
            }
            beasts = JSON.parse(JSON.stringify(beasts));
            if (beasts[0] == null) {
              console.log('GOT [ null ]');
              beasts = [];
            }
            res.send(beasts);
        });
    },

    getAnimalByName: (req, res) => {
        console.log('getAnimalByDisplayName');
        console.log('req.params.name: ', req.params.name);
        let beasts = [];
        Promise.all([
            pgetByFullName(req.params.name),
            pgetByDisplayName(req.params.name)
        ])
        .then( ([resFull, resDisplay]) => {
            console.log('Promises completed');
            beasts = resFull.concat(resDisplay);
            console.log('beasts: ', beasts);
            res.send(beasts);
        })
        .catch( (err) => {
            return res.status(400).send(error);
        });
    },

    getAnimalByDisplayName: (req, res) => {
        console.log('getAnimalByDisplayName');
        console.log('req.params.name: ', req.params.name);
        AnimalModel.getByDisplayName(req.params.name, (error, beasts) => {
            if (error) {
                return res.status(400).send(error);
            }
            console.log('beasts: ', beasts);
            res.send(beasts);
        });
    },

    deleteAnimal: (req, res) => {
        AnimalModel.getById(req.params.id, (error, beast) => {
            if (error) {
                return res.status(400).send(error);
            }
            beast.remove((error, result) => {
                if (error) {
                    return res.status(400).send(error);
                }
                res.status(202).send('Deleted! ' + beast.name.full);
            })
        })
    }

}
