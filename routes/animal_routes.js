var ctr = require('./../controllers/animal_controller');

console.log('loading animal routes');

module.exports = (app) => {

    app.route('/animal').post(ctr.createAnimal);
    app.route('/animal').get(ctr.getAnimals);
    app.route('/animal/:id').get(ctr.getAnimal);
    app.route('/animal/byName/:name').get(ctr.getAnimalByName);
    app.route('/animal/byDisplayName/:name').get(ctr.getAnimalByDisplayName);
    app.route('/animal/:id').delete(ctr.deleteAnimal);
    
}

console.log('Finished: loading animal routes');
