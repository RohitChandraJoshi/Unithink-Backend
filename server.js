const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv for environment variables
const app = express();
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Import and use routes
const countryRoutes = require('./Country'); // Replace with actual routes if needed
const countryDetailsRoutes = require('./CountryDetails'); // Replace with actual routes if needed
const faqRoutes = require('./faq'); // Replace with actual routes if needed
const coursesRoutes = require('./Courses'); // Replace with actual routes if needed
const coursesDetailsRoutes = require('./CoursesDetails'); // Replace with actual routes if needed
const contactRoutes = require('./Contact'); // Assuming 'Contact.js' exports a valid router

// Use the routes
app.use('/api/country', countryRoutes);
app.use('/api/countryDetails', countryDetailsRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/coursesdetails', coursesDetailsRoutes);
app.use('/api/consultation', contactRoutes); // Use the correct path for 'Contact.js'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
