var ottoman = require('ottoman');

var TreatmentModel = ottoman.model('Treatment', {  // Data common to all treaments
    start_time: {  // default to now.  Use this as the ref for date of the treatment
      type: 'Date',
      default: function() {
          return new Date();
      }
    },
    finish_time-time: {
      type: 'Date'
    },
    therapist: {  // Therapist performing treament
        ref: 'Person'
    },
    animal: {  // Animal the treatment is on
      ref: 'Animal'
    },
    location: {
      ref: 'Location'
    },
    comments: [{  // Comments on the Animal.
        ref: 'Comment'
    }],
    recommendations: [{  // Comments on the Animal.
        ref: 'Recommendation'
    }],
    warnings: [{  // Comments on the Animal.
        ref: 'Warning'
    }],
    proceed: 'boolean', // Able to proceed with treament - ie. passed checks
    signing_person: {
      ref: 'Person',
      signature_img: 'blob'  // reference to signature image.
    },
    squiggle: {
      ref: 'Squiggle'
    },
    //treatment_detail: {  // Back reference from the animal specific doc to this treatment
    //  ref: 'DetailTreatment'
    //}
});

module.exports.TreatmentModel = TreatmentModel;
