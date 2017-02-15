var ottoman = require('ottoman');

var HorseTreatmentModel = ottoman.model('HorseTreatment', {
    ref_treatement: {  // Reference to the parent treatment
      ref: 'Treatment'
    },
    recent_work: 'string',
    dental_check: 'number',  // days since dental?  Is this a pre-condition check?
    condition_checks: {  // If any true then proceed = false
      laminitus: 'boolean',
      joint_condition: 'boolean',
      arthritis: 'boolean',
      other_condition: 'boolean',
      other_condition_detail: 'string',
      vaccinated: 'boolean'  // In past week?
    },
    squiggle: { // refs to vector files for each overlay - svg, base64, ??.
      // Might have to split as Ottoman can't do blobs?
      background: 'BackgroundSquiggle',  // reference to background vector information
      soreness: 'Squiggle', // vector for areas of soreness
      treated: 'Squiggle'  // vector for area treated
    }
});

module.exports.HorseTreatmentModel = HorseTreatmentModel;
