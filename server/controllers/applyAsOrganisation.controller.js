const ApplyAsOrganisation = require('../models/applyAsOrganisation.model');
const Organisation = require('../models/organisation.model');
const Developer = require('../models/developer.model');

// Create a new application
const applyAsOrganisation = async (req, res) => {
    try {
        const { organisationId, developerIds } = req.body;

        if (!organisationId || !developerIds || developerIds.length === 0) {
            return res.status(400).json({ error: 'Organisation ID and Developer IDs are required' });
        }

        //Validation code
        const orgExists = await Organisation.findOne({ _id: organisationId.toString() });
        if (!orgExists) {
            return res.status(400).json({ message: "Invalid Organisation Id. Organisation not found" });
        }

        const validDevs = await Developer.find({ _id: { $in: developerIds } });
        if (validDevs.length !== developerIds.length) {
            return res.status(404).json({ message: "Some Developer Ids are invalid" });
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
        const applications = await ApplyAsOrganisation.find();
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

        // Validation code
        const orgExists = await Organisation.findOne({ _id: organisationId.toString() });
        if (!orgExists) {
            return res.status(400).json({ message: "Invalid Organisation Id. Organisation not found" });
        }

        const validDevs = await Developer.find({ _id: { $in: developerIds } });
        if (validDevs.length !== developerIds.length) {
            return res.status(404).json({ message: "Some Developer IDs are invalid" });
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