var ottoman = require('ottoman');

//ottoman.store = require('./index').store;

var CommentModel = ottoman.model('Comment', {
    timestamp: {
        type: 'Date',
        default: function() {
            return new Date();
        }
    },
    therapist: 'Person',
    message: 'string'
});

var ReccomendationModel = ottoman.model('Recommendation', {
    timestamp: {
        type: 'Date',
        default: function() {
            return new Date();
        }
    },
    therapist: 'Person',
    message: 'string'
});

var WarningModel = ottoman.model('Warning', {
    timestamp: {
        type: 'Date',
        default: function() {
            return new Date();
        }
    },
    therapist: 'Person',
    message: 'string'
});

module.exports.CommentModel = CommentModel;
module.exports.ReccomendationModel = ReccomendationModel;
module.exports.WarningModel = WarningModel;
