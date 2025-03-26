const express = require('express');
const multer = require('multer');
const fs=require('fs');
const { registerDeveloper, getAllDevelopers, getDeveloperById, updateDeveloper, deleteDeveloper } = require('../controllers/developer.controller.js');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
// File type filter for resumes
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
   
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed."), false);
    }
  };
   
  // Multer upload middleware
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
  });

module.exports=upload;
// Register Developer
router.post('/', upload.single('resume'), registerDeveloper);

// Get All Developers
router.get('/', getAllDevelopers);

// Get Developer by ID
router.get('/:id', getDeveloperById);

//update developer
router.patch('/:id',updateDeveloper);
 
//delete developer
router.delete('/:id',deleteDeveloper);
 
module.exports = router;