const Developer = require('../models/developer.model');
const fs=require('fs');
const path=require('path');

const registerDeveloper = async (req, res) => {
    try {
        const {
            DEVId,
            firstName,
            lastName,
            email,
            availability,
            skills,
            yearsOfExperience,
            dev_location,
            // projects,
            resume
        } = req.body;

        let resumePath = null;
        if (resume) {
            const buffer = Buffer.from(resume.split(',')[1], 'base64');
            resumePath = path.join(__dirname, '../uploads/', `${Date.now()}-resume.pdf`);
            fs.writeFileSync(resumePath, buffer);
        }

        if (!firstName || !lastName || !email || !dev_location || !availability || !skills || !yearsOfExperience) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // let parsedSkills;
        // try {
        //     parsedSkills = JSON.parse(skills);
        // } catch (error) {
        //     return res.status(400).json({ message: 'Invalid JSON format for skills', error: error.message });
        // }
       
        // Split the skills string into an array, trim spaces, and filter out empty strings
       



        // try {
        //     parsedProjects = projects ? JSON.parse(projects) : [];
        // } catch (error) {
        //     return res.status(400).json({ message: 'Invalid JSON format for projects', error: error.message });
        // }

        const newDeveloper = new Developer({
            DEVId,
            firstName,
            lastName,
            email,
            availability,
            skills,
            // skills:skillsArray,
            yearsOfExperience,
            dev_location,
            resume: resumePath,
            // projects: parsedProjects
            
        });

        await newDeveloper.save();
        res.status(201).json({ message: 'Developer registered successfully', developer: newDeveloper });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getAllDevelopers = async (req, res) => {
    try {
        const developers = await Developer.find();
        res.status(200).json(developers);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getDeveloperById = async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id);
        if (!developer) {
            return res.status(404).json({ message: 'Developer not found' });
        }
        res.status(200).json(developer);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



//  // Update a developer by ID
// const updateDeveloper = async (req, res) => {
//     try {
//       const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//       if (!developer) {
//         return res.status(404).json({ error: 'Developer not found' });
//       }
//       res.status(200).json(developer);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };


 // Update a developer by ID
// const updateDeveloper = async (req, res) => {
//     try {
//         // Parse skills and projects if they are passed as strings
//         if (typeof req.body.skills === 'string') {
//             req.body.skills = req.body.skills.split(',').map(skill=>skill.trim());
//         }
//         // if (typeof req.body.projects === 'string') {
//         //     req.body.projects = JSON.parse(req.body.projects);
//         // }
 
//         const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!developer) {
//             return res.status(404).json({ error: 'Developer not found' });
//         }
//         res.status(200).json(developer);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


const updateDeveloper = async (req, res) => {
    try {
        // Parse skills if they are passed as a string
        if (typeof req.body.skills === 'string') {
            req.body.skills = req.body.skills.split(',').map(skill => skill.trim());
        }

        const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!developer) {
            return res.status(404).json({ error: 'Developer not found' });
        }
        res.status(200).json(developer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


 
  // Delete a developer by ID
  const deleteDeveloper = async (req, res) => {
    try {
      const developer = await Developer.findByIdAndDelete(req.params.id);
      if (!developer) {
        return res.status(404).json({ error: 'Developer not found' });
      }
      res.status(200).json({ message: 'Developer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    registerDeveloper,
    getAllDevelopers,
    getDeveloperById,
    updateDeveloper,
    deleteDeveloper
};