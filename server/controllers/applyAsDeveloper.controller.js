const ApplyAsDeveloper = require('../models/applyAsDeveloper.model');

// Create a new application
const applyAsDeveloper = async (req, res) => {
    try {
        const { developerId, projectIds} = req.body;

        if (!projectIds || !developerId || projectIds.length === 0) {
            return res.status(400).json({ error: 'Project IDs and Developer ID are required' });
        }
        
        //check validation code
        // const devExists= await Developer.findOne({_id:developerId.toString()});
        // if(!devExists){
        //     return res.status(400).json({message:"Invalid Dev Id. Developer not found"});
        // }

        // const validProjs = await Project.find({_id:{$in:projectIds}});
        // if(validProjs.length !== projectIds.length){
        //     return res.status(404).json({message: "some project ids are invalid"});
        // }

        const application = new ApplyAsDeveloper({ projectIds, developerId });
        await application.save();

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await ApplyAsDeveloper.find()
            .populate('projectIds', 'name') // Populating project names
            .populate('developerId', 'name'); // Populating developer name
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an application
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await ApplyAsDeveloper.findByIdAndDelete(id);

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
        const { developerId, projectIds } = req.body;
 
        if (!projectIds || !developerId || projectIds.length === 0) {
            return res.status(400).json({ error: 'Project IDs and Developer ID are required' });
        }
 
        // Check validation code
        // const devExists = await Developer.findOne({ _id: developerId.toString() });
        // if (!devExists) {
        //     return res.status(400).json({ message: "Invalid Dev Id. Developer not found" });
        // }
 
        // const validProjs = await Project.find({ _id: { $in: projectIds } });
        // if (validProjs.length !== projectIds.length) {
        //     return res.status(404).json({ message: "Some project IDs are invalid" });
        // }
 
        const application = await ApplyAsDeveloper.findByIdAndUpdate(id, { developerId, projectIds }, { new: true });
 
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
 
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    applyAsDeveloper,
    getAllApplications,
    deleteApplication,
    editApplication
};