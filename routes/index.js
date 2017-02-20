var fs = require('fs');

module.exports = function(app) {
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;
        var name = file.substr(0, file.indexOf('.'));
        console.log('Processing: ', name);
        require('./' + name)(app);
        console.log('Finished Processing: ', name);
    });
}


// ToDO use regex to filter out anything not called *routes.js
// Rmeove if() statement and replace with a filter on readdirSync
// Should be an added pipe something like??? -> .filter( (f) => { return (/routes.js$/).test(f); });
