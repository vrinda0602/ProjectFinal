const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    dev_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    skills: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;