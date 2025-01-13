// routes/documentationRoutes.js
const express = require('express');
const router = express.Router();

// Documentation route
router.get('/', (req, res) => {
  res.send(`
    <h1>API Documentation</h1>
    <ul>
      <li><strong>GET /tents</strong> - Retrieve all tents</li>
      <li><strong>POST /tents</strong> - Add a new tent</li>
      <li><strong>GET /bookings</strong> - Retrieve all bookings</li>
      <li><strong>POST /bookings</strong> - Add a new booking</li>
    </ul>
  `);
});

module.exports = router;
