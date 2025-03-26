const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const numberId = customAlphabet('0123456789', 8);
const fs=require('fs');

const developerSchema = new mongoose.Schema({
    _id: { type: String, default: () => `DEV-${numberId()}` },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    availability: { type: String, enum: ['Part-Time', 'Full-Time'], required: true },
    skills: { type: [String], required: true },
    yearsOfExperience: { type: Number, required: true },
    dev_location: { type: String, required: true },
    resume: { type: String }
    // projects: [
    //     {
    //         projectName: { type: String, required: true },
    //         projectDescription: { type: String, required: true },
    //         projectLink: { type: String, required: true }
    //     }
    // ]
}, { timestamps: true });

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;