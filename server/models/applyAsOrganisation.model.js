const mongoose = require('mongoose');

const applyAsOrganisationSchema = new mongoose.Schema({
    organisationId: {
        type: String,
        // ref: 'organisation.model', // Reference to the Organisation model
        required: true
    },
    developerIds: [{ // Changed developerId to developerIds and made it an array
        type: String,
        // ref: 'developer.model', // Reference to the Developer model
        required: true
    }]
}, { timestamps: true });

const ApplyAsOrganisation = mongoose.model('ApplyAsOrganisation', applyAsOrganisationSchema);

module.exports = ApplyAsOrganisation;