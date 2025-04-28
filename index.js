require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes'); // Adjust the path if necessary
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || '';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());
app.use(cors());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Tickets Support App API!');
});

// Use routes
app.use('/api', routes); // Prefix all routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
});