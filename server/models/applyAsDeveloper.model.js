const mongoose = require('mongoose');
const applyAsDeveloperSchema = new mongoose.Schema({
    developerId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'developer.model', // Reference to the Developer model
        required: true
    },
    projectIds: [{ // Changed projectId to projectIds and made it an array
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'project.model', // Reference to the Project model
        required: true
    }],
}, { timestamps: true });

const ApplyAsDeveloper = mongoose.model('ApplyAsDeveloper', applyAsDeveloperSchema);

module.exports = ApplyAsDeveloper;