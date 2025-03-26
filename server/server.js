const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs=require('fs');
const applyAsDeveloperRoutes = require('./routes/applyAsDeveloper.route');
const applyAsOrganisationRoutes = require('./routes/applyAsOrganisation.route');

// Routes
const organisationRoutes = require('./routes/organisation.route');
const developersRoute = require('./routes/developer.route'); // Adjust the path as necessary
const projectRoutes = require('./routes/project.route');
const skillRoutes = require('./routes/skills.route'); // Import the routes file

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/org', organisationRoutes);
app.use('/register', developersRoute);
app.use('/projects', projectRoutes);
app.use('/browse', skillRoutes); // Add the all browse routes
app.use('/organisation', applyAsDeveloperRoutes);
app.use('/apply', applyAsOrganisationRoutes);

// app.get('/download-resume/:filename', (req, res) => {
//     const filePath = path.join(__dirname, 'uploads', req.params.filename);
   
//     // Check if the file exists
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).send('File not found');
//     }
   
//     // Set the headers
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
   
//     // Stream the file to the response
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
//   });

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/developerData'; // Replace with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});