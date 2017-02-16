var AnimalModel = require("./../models/animal_model").AnimalModel;

console.log('loading animal controller');

module.exports = {

    postAnimal: (req, res) => {
        var beast = new AnimalModel({
            species: req.body.type,
            name: {
                full: req.body.name.full,
                display: req.body.name.display
            },
            breed: req.body.breed,
            colour: req.body.colour,
            //size: // logic needed for conversion to cm,
            activity: req.body.activity,
            gender: req.body.gender
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
