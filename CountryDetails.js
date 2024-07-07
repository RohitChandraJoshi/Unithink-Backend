const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/:countryid', (req, res) => {
  const countryId = req.params.countryid;
  const filePath = path.join(__dirname, 'CountriesDetails.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading data');
    }

    try {
      const countryDetails = JSON.parse(data);
      const country = countryDetails.find(country => country.c_id === countryId);

      if (!country) {
        return res.status(404).send('Country not found');
      }

      res.json(country);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON');
    }
  });
});

module.exports = router;
