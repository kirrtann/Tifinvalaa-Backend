const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profiledata = require('./routes/profiledata.js')

// Initialize environment variables
dotenv.config();

const app = express();

// Middlewar
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/profiledata',profiledata)
app.use('/TiffinDEtail',email)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
