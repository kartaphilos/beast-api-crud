var AnimalModel = require("./../models/animal_model").AnimalModel;

console.log('loading animal controller');

module.exports = {

    getAnimal : (req, res) => {
      AnimalModel.getById(req.params.id, (error, beast) => {
          if (error) {
              return res.status(400).send(error);
          }
          res.send(beast);
      })
    },

    getAnimals : (req, res) => {
      AnimalModel.find({}, (error, beasts) => {
              if (error) {
                  return res.status(400).send(error);
              }
              res.send(beasts);
      });
    },

    getAnimalByName : (req, res) => {
      AnimalModel.getByFullName(req.params.name, (error, beasts) => {
          if (error) {
              return res.status(400).send(error);
          }
          res.send(beasts);
      })
    },

    postAnimal : (req, res) => {
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
          beast.save(function(error, result) {
              if (error) {
                  return res.status(400).send(error);
              }
              res.send(result);
          });
    }

}
