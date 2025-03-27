const express = require('express');
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectByOrgId
} = require('../controllers/project.controller');

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

//for linking orgId with the ProjectId of that organisation
router.get('/print/:orgId', getProjectByOrgId);

module.exports = router;
