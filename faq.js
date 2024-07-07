
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'FAQ.json');


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
