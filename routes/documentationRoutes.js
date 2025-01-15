// routes/documentationRoutes.js
const express = require('express');
const router = express.Router();

// Documentation route
router.get('/', (req, res) => {
  res.send(`
    <h1>API Documentation</h1>
    <p>Welcome to the API documentation! Below are the available endpoints:</p>
    <h2>Tents</h2>
    <ul>
      <li><strong>GET /tents</strong> - Retrieve all tents</li>
      <li><strong>GET /tents/:id</strong> - Retrieve a specific tent by ID</li>
      <li><strong>GET /tents/paginated</strong> - Retrieve tents with pagination (query params: limit, offset)</li>
      <li><strong>GET /tents/search</strong> - Search tents based on name, capacity, and price_per_day</li>
      <li><strong>POST /tents</strong> - Add a new tent (requires: name, capacity, price_per_day)</li>
      <li><strong>PUT /tents/:id</strong> - Update an existing tent (requires: id, optional fields to update)</li>
      <li><strong>DELETE /tents/:id</strong> - Delete a tent by its id</li>
    </ul>
    
    <h2>Bookings</h2>
    <ul>
      <li><strong>GET /bookings</strong> - Retrieve all bookings</li>
      <li><strong>GET /bookings/:id</strong> - Retrieve a specific booking by ID</li>
      <li><strong>POST /bookings</strong> - Add a new booking (requires: customer_name, start_date, end_date, tent_id)</li>
      <li><strong>PUT /bookings/:id</strong> - Update an existing booking (requires: id, optional fields to update)</li>
      <li><strong>DELETE /bookings/:id</strong> - Delete a booking by its id</li>
    </ul>
    
    <h2>Validation Rules</h2>
    <ul>
      <li><strong>Fields cannot be empty.</strong></li>
      <li><strong>Numerical fields must not accept strings.</strong></li>
      <li><strong>Names must not contain numbers (e.g., customer_name).</strong></li>
    </ul>
  `);
});

module.exports = router;
