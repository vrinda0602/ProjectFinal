const Developer = require('../models/developer.model');
const Skill = require('../models/skills.model');
const Project = require('../models/project.model');

// Get all skills
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single skill by ID
const getSkillById = async (req, res, next) => {
    let skill;
    try {
        skill = await Skill.findById(req.params.id);
        if (skill == null) {
            return res.status(404).json({ message: 'Cannot find skill' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.skill = skill;
    next();
};

// Create a new skill
const createSkill = async (req, res) => {
    const skill = new Skill({
        name: req.body.name,
        proficiency: req.body.proficiency
    });

    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a skill
const updateSkill = async (req, res) => {
    if (req.body.name != null) {
        res.skill.name = req.body.name;
    }
    if (req.body.proficiency != null) {
        res.skill.proficiency = req.body.proficiency;
    }

    try {
        const updatedSkill = await res.skill.save();
        res.json(updatedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a skill
const deleteSkill = async (req, res) => {
    try {
        await res.skill.deleteOne();
        res.json({ message: 'Deleted Skill' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const getDevBySkill = async (req, res) => {
    try {
        let { skill } = req.params;
        console.log('skill', skill);

        // // skill= skill
        // .toLowerCase()
        // .split(" ")
        // .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
        // .join(" ");


        if (skill.toLowerCase() === "all") {
            //fetch all developers
            Developer.find({})
                .then(r => res.send(r))
                .catch(e => res.status(404).json(e));
        }
        else {
            //fetch developers with given skill
            // console.log({skills: { $all : [`${skill}`]}})
            // Developer.find({skills: { $in : [`${skill}`]}})
            Developer.find({ skills: { $regex: skill, $options: "i" } })
                .then(r => { res.status(200).json(r); console.log(r) })
                // .then(r=>{res.status(200).json(developers)})
                .catch(e => res.status(404).json({ message: " no developers found" }));
            // console.log('developers',developers)

            // if(developers.length === 0){
            //     return res.status(404).json({message:" no developers found"});
            // }
            // res.status(200).json(developers);
        }




    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProjectBySkill = async (req, res) => {
    try {
        let { skill } = req.params;

        // skill= skill
        // .toLowerCase()
        // .split(" ")
        // .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
        // .join(" ");

        let projects;

        if (skill.toLowerCase() === "all") {
            //fetch all developers
            projects = await Project.find({});
        }
        else {
            //fetch developers with given skill
            projects = await Project.find({ skillsRequired: skill })
        }

        if (projects.length === 0) {
            return res.status(404).json({ message: " no projects found" });
        }

        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getLatestDev = async (req, res) => {
    try {

        const developers = await Developer.find().sort({ createdAt: -1 }).limit(4);

        if (developers.length === 0) {
            return res.status(404).json({ message: " no developers found" });
        }

        res.status(200).json(developers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
    getDevBySkill,
    getProjectBySkill,
    getLatestDev
};