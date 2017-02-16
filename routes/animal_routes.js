var AnimalModel = require("./../models/animal_model").AnimalModel;

var appRouter = function(app) {

        app.post("/animal", function(req, res) {
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
        });

        app.get("/animal", function(req, res) {
            AnimalModel.find({}, (error, beasts) => {
                if (error) {
                    return res.status(400).send(error);
                }
                res.send(beasts);
            });
        });

        app.get("/animal/:id", function(req, res) {
            AnimalModel.getById(req.params.id, (error, beast) => {
                if (error) {
                    return res.status(400).send(error);
                }
                res.send(beast);
            })
        });

        app.get("/animal/byName/:name", (req, res) => {
          AnimalModel.getByName(req.params.name, (error, beasts) => {
              if (error) {
                  return res.status(400).send(error);
              }
              res.send(beasts);
          })
        });

module.exports = appRouter;
