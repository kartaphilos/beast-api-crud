var AnimalCtrlr = require('./../controllers/animal_controller');

console.log('loading animal routes');

module.exports = (app) => {

    app.route('/animal').post(AnimalCtrlr.postAnimal);
    app.route('/animal').get(AnimalCtrlr.getAnimals);
    app.route('/animal/:id').get(AnimalCtrlr.getAnimal);
    app.route('/animal/byName/:name').get(AnimalCtrlr.getAnimalByName);

}
