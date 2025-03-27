const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills.controller');

// Get all skills
router.get('/skills', skillsController.getAllSkills);

// Get a single skill by ID
router.get('/skills/:id', skillsController.getSkillById, (req, res) => {
    res.json(res.skill);
});

//get Developers info by searching specific skill
// if you want to show all developer(brwose developer)--> ('/dev/skill/all)
router.get('/dev/skill/:skill', skillsController.getDevBySkill);

//get projects having specific skill
//to display all projects--> ('/project/skill/all)
router.get('/project/skill/:skill', skillsController.getProjectBySkill);

//get the latest 4 developers on basis of their info added into database//timestamp(createdAt)
router.get('/dev/latest', skillsController.getLatestDev);

// Create a new skill
router.post('/skills', skillsController.createSkill);

// Update a skill
router.patch('/skills/:id', skillsController.getSkillById, skillsController.updateSkill);

// Delete a skill
router.delete('/skills/:id', skillsController.getSkillById, skillsController.deleteSkill);

module.exports = router;