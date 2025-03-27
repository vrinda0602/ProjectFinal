const express = require('express');
const {
    applyAsOrganisation,
    getAllApplications,
    deleteApplication,
    editApplication
} = require('../controllers/applyAsOrganisation.controller');

const router = express.Router();

router.post('/add', applyAsOrganisation);
router.get('/get', getAllApplications);
router.delete('/:id', deleteApplication);
router.put('/:id', editApplication);

module.exports = router;