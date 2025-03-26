const mongoose = require('mongoose');
const {customAlphabet}= require('nanoid');
const numberId= customAlphabet('0123456789',8);

const organisationSchema = new mongoose.Schema({
    _id:{ type:String, default: ()=>`ORG-${numberId()}`},
    orgName: { type: String, required: true },
    emailAddress: { type: String, required: true}, //match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ }, // Basic email validation
    phoneNumber: { type: String },
    bestTimeToCall: { type: String, enum: ['Morning', 'Afternoon', 'Evening'] }, // Example radio options
    location: { type: String }, //part of project not org
    budget: { type: String }, //remove it in last since budget is part of proj not org
    // Or Number, depending on your range representation
    // projectId:{type:Number ,required:true},
    projectName:{ type: String },
    projectDesc:{ type:String},
    skillsNeeded: [{ type: String }],
    website: { type: String },
    startDate: { type: Date },
    approxDuration: { type: String }
  });
 
  const Organisation = mongoose.model('Organisation', organisationSchema);
 
  module.exports = Organisation;
 