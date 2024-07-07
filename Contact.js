const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  agreeTerms: {
    type: Boolean,
    required: true
  },
  contactPreference: {
    type: Boolean,
    required: true
  },
  receiveUpdates: {
    type: Boolean,
    required: true
  }
});

// Create the model
const Contact = mongoose.model('Students', contactSchema);

// Define the route for form submission
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send({ message: 'Failed to submit form. Please try again later.' });
  }
});

module.exports = router;
