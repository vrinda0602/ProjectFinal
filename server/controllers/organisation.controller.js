//save data in org and project table
const express = require('express');
const router = express.Router();
const Organisation = require('../models/organisation.model'); // Import the Mongoose model
const Project= require('../models/project.model');
 
const createOrganisation = async (req, res) => {
  //console.log(req.body);
  try {
    const { orgID, orgName, emailAddress, phoneNumber, bestTimeToCall, location, budget, projectName, projectDesc, skillsNeeded, website, startDate, approxDuration } = req.body;
    const newOrganisation = new Organisation({
      orgID,
      orgName,
      emailAddress,
      phoneNumber,
      bestTimeToCall,
      location,
      budget,
      projectName,
      projectDesc,
      skillsNeeded,
      website,
      startDate,
      approxDuration
    });
 
    await newOrganisation.save();
    
    console.log('newOrganisation',newOrganisation);
    const newProject = new Project({
        orgId: newOrganisation._id,
        orgName,
        projectName,
        projectDescription: projectDesc,
        skillsRequired: skillsNeeded,// Convert comma-separated skills into an array
        budget,
        location
    });
    await newProject.save();
     console.log('newProject',newProject);
    res.status(201).json(newOrganisation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// New function to get all organisations
const getOrganisations = async (req, res) => {
    try {
      const organisations = await Organisation.find();
      res.status(200).json(organisations);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
 
  const updateOrganisations = async (req, res) => {
    try {
      const { _id, OrgName } = req.body; // Extract _id and OrgName from the request body
   
      const updatedOrganisation = await Organisation.findOneAndUpdate(
        { _id, OrgName }, // Query object with both _id and OrgName
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedOrganisation) {
        res.status(200).json(updatedOrganisation);
      } else {
        res.status(404).send('Organisation not found');
      }
    } catch (error) {
      res.status(500).send('Error updating organisation: ' + error.message);
    }
  };
   
  const deleteOrganisations = async (req, res) => {
    try {
      const { _id, OrgName } = req.query;
      const deletedOrganisation = await Organisation.findOneAndDelete({ _id, OrgName }); // Correct model reference
      if (deletedOrganisation) {
        res.status(200).json({ message: 'Deleted successfully' }); // Remove extra space
      } else {
        res.status(404).json({ message: 'Organisation not found' }); // Correct message
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting organisation: ' + error.message }); // Correct message
    }
  };

module.exports = {
  createOrganisation,
  getOrganisations,
  deleteOrganisations,
  updateOrganisations
};