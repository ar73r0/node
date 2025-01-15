// Required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./config/database');
const tentRoutes = require('./routes/tentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const documentationRoutes = require('./routes/documentationRoutes');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/tents', tentRoutes);
app.use('/bookings', bookingRoutes);
app.use('/', documentationRoutes);

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => console.error('Database initialization failed:', err));
