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
      year = now.getUTCFullYear() - (agedate.getUTCFullYear()-1970);
      console.log('year: ', year);
      agedate =  new Date(now.setUTCFullYear(year));
      console.log('dob: ', agedate);
      bd = (new Date(now.setUTCFullYear(year))).toISOString();

      //diff = Date.now() - Date.parse(bd);
      //D = Date.parse(diff);
      //console.log('D1: ', D);
      //bd = D.toISOString();
  }
  console.log('bd: ', bd);
  return bd;
}

module.exports = {

    createAnimal: (req, res) => {
        var beast = new AnimalModel({
            species: req.body.type,
            name: {
                full: req.body.name.full,
                display: req.body.name.display
            },
            breed: req.body.breed,
            colour: req.body.colour,
            size:  req.body.size,
            activity: req.body.activity,
            gender: req.body.gender,
            birth: {
              estimated: req.body.birth.estimated,
              date: calcBirthDate(req)
            }
        });
        beast.save( (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.status(201).send('Created: ' + beast.name.full + '\n' + result);
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
            res.send(beasts);
        });
    },

    getAnimalByName: (req, res) => {
        AnimalModel.getByFullName(req.params.name, (error, beasts) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(beasts);
        })
    },

    deleteAnimal: (req, res) => {
      AnimalModel.getById(req.params.id, (error, beast) => {
          if (error) {
              return res.status(400).send(error);
          }
          beast.remove( (error, result) => {
            if (error) {
              return res.status(400).send(error);
            }
            res.status(202).send('Deleted! ' + beast.name.full);
          })
      })
    }

}
