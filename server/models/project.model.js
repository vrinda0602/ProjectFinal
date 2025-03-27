const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
// (async () => {
//     const { customAlphabet } = await import('nanoid');
//     // Your code using customAlphabet
//   })();
const numberId = customAlphabet('0123456789', 8);

const projectSchema = new mongoose.Schema({
    _id: { type: String, default: () => `P-${numberId()}` },
    orgId: {
        type: String,
        ref: "Organisation",
        required: true
    },
    orgName: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String], // Array of skills
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;