const ApplyAsOrganisation = require('../models/applyAsOrganisation.model');

// Create a new application
const applyAsOrganisation = async (req, res) => {
    try {
        const { organisationId, developerIds } = req.body;

        if (!organisationId || !developerIds || developerIds.length === 0) {
            return res.status(400).json({ error: 'Organisation ID and Developer IDs are required' });
        }

        const application = new ApplyAsOrganisation({ organisationId, developerIds });
        await application.save();

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await ApplyAsOrganisation.find()
            .populate('organisationId', 'name') // Populating organisation name
            .populate('developerIds', 'name'); // Populating developer names
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an application
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await ApplyAsOrganisation.findByIdAndDelete(id);

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit an application
const editApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { organisationId, developerIds } = req.body;
 
        if (!organisationId || !developerIds || developerIds.length === 0) {
            return res.status(400).json({ error: 'Organisation ID and Developer IDs are required' });
        }
 
        const application = await ApplyAsOrganisation.findByIdAndUpdate(id, { organisationId, developerIds }, { new: true });
 
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
 
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    applyAsOrganisation,
    getAllApplications,
    deleteApplication,
    editApplication
};