const Organisation = require('../models/organisation.model');
const Project = require('../models/project.model');
 
// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { OrgId, OrgName, projectName, projectDescription, skillsRequired , budget, location } = req.body;
 
        if (!orgId || !projectName || !projectDescription || !skillsRequired || !budget || !location ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingOrg= await Organisation.findById(orgId);
        if(!existingOrg){
            return res.status(404).json({error:"Organisation not found"});
        }

        const newProject = new Project({
            orgId,
            orgName,
            projectName,
            projectDescription,
            skillsRequired, // Convert comma-separated skills into an array
            budget,
            location
        });
 
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
 
// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        console.log(projects);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
 
// Get project by ID
exports.getProjectById = async (req, res) => {
    try {
const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
 
// Update project by ID
exports.updateProject = async (req, res) => {
    try {
const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete project by ID
exports.deleteProject = async (req, res) => {
    try {
const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getProjectByOrgId= async(req,res)=>{
    try {
        const {orgId}= req.params;
        // console.log("received:", orgId);

        if(!orgId){
            return res.status(404).json({error:"OrgId is required"});
        }
        //find projects that belong to given OrgID
        const projects= await Project.find({orgId}).populate("orgId");

        if(projects.length === 0){
            return res.status(404).json({message:"No projects found for this org"});
        }

        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
// const Project = require('../models/projectmodel');
 
// // Create a new project
// exports.createProject = async (req, res) => {
//     try {
//         const { orgId, projectName, projectDescription, skillsRequired } = req.body;
 
//         if (!orgId || !projectName || !projectDescription || !skillsRequired) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }
 
//         const newProject = new Project({
//             orgId,
//             projectName,
//             projectDescription,
//             skillsRequired, // Convert comma-separated skills into an array
//             budget,
//             location
//         });
 
//         await newProject.save();
//         res.status(201).json({ message: 'Project created successfully', project: newProject });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };
 
// // Get all projects
// exports.getAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find();
//         res.status(200).json(projects);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


 
// // Get project by ID
// exports.getProjectById = async (req, res) => {
//     try {
// const project = await Project.findById(req.params.id);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }
//         res.status(200).json(project);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };
 
// // Update project by ID
// exports.updateProject = async (req, res) => {
//     try {
// const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProject) {
//             return res.status(404).json({ message: 'Project not found' });
//         }
//         res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };
 
// // Delete project by ID
// exports.deleteProject = async (req, res) => {
//     try {
// const deletedProject = await Project.findByIdAndDelete(req.params.id);
//         if (!deletedProject) {
//             return res.status(404).json({ message: 'Project not found' });
//         }
//         res.status(200).json({ message: 'Project deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };