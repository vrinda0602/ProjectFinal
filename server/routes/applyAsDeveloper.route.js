const express = require('express');
const {
    applyAsDeveloper,
    getAllApplications,
    deleteApplication,
    editApplication
} = require('../controllers/applyAsDeveloper.controller');

const router = express.Router();

router.post('/add', applyAsDeveloper);
router.get('/get', getAllApplications);
router.delete('/:id', deleteApplication);
router.put('/:id', editApplication);

module.exports = router;