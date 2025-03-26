const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisation.controller'); // Import the controller
 
router.post('/organisations', organisationController.createOrganisation);
router.get('/organisations', organisationController.getOrganisations);
router.delete('/organisations', organisationController.deleteOrganisations);
router.put('/organisations', organisationController.updateOrganisations);
 
module.exports = router;