// FAQ.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the path to the FAQ JSON file
const filePath = path.join(__dirname, 'FAQ.json');

// Route to get all FAQs
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      res.status(500).json({ error: 'Failed to parse data' });
    }
  });
});

module.exports = router;
