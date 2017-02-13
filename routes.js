var PersonModel = require("./models").PersonModel;
var AnimalModel = require("./models").AnimalModel;

var appRouter = function(app) {

    app.get("/person", function(req, res) {
        PersonModel.find({}, {
            load: ["comments"]
        }, function(error, people) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(people);
        });
    });

    app.get("/person/:id", function(req, res) {
        PersonModel.getById(req.params.id, {
            load: ["comments"]
        }, function(error, person) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(person);
        })
    });

    app.get("/person/byEmail/:email", function(req, res) {
        PersonModel.getByEmail(req.params.email, {
            load: ["comments"]
        }, function(error, person) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(person);
        })
    });

    app.post("/person", function(req, res) {
        var person = new PersonModel({
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            email: req.body.email
        });
        person.save(function(error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });

    });

    app.post("/comment", function(req, res) {
        var comment = new CommentModel({
            message: req.body.message
        });
        comment.save(function(error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            PersonModel.getById(req.body.id, function(error, person) {
                if (error) {
                    return res.status(400).send(error);
                }
                person.comments.push(comment);
                person.save(function(error, result) {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    res.send(person);
                });
            });
        });
    });
}

module.exports = appRouter;