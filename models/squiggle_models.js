var ottoman = require('ottoman');

var SquiggleModel = ottoman.model('Squiggle', {  // assumes one vector for all views
    type: 'string',  // soreness, treated, ...
    treatment_ref: 'Treatment',
    filename: 'string',
    background 'BackgroundSquiggle'
});

var BackgroundSquiggleModel = ottoman.model('BackgroundSquiggle', {
    type: 'string',  // which animal
    version: 'number',
    filename: 'string',
});

module.exports.SquiggleModel = SquiggleModel;
module.exports.BackgroundSquiggleModel = BackgroundSquiggleModel;
