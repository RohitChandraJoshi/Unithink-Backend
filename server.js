const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const app = express();
dotenv.config(); 

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  'https://unithinkportal.netlify.app',
  'https://unithink.in',
  'https://www.unithink.in'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const countryRoutes = require('./Country'); 
const countryDetailsRoutes = require('./CountryDetails'); 
const faqRoutes = require('./faq'); 
const coursesRoutes = require('./Courses'); 
const coursesDetailsRoutes = require('./CoursesDetails'); 
const contactRoutes = require('./Contact'); 

app.use('/api/country', countryRoutes);
app.use('/api/countryDetails', countryDetailsRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/coursesdetails', coursesDetailsRoutes);
app.use('/api/consultation', contactRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
