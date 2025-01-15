const express = require('express');
const { check, validationResult } = require('express-validator');
const { Booking, Tent } = require('../models');
const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: Tent });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.get('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, { include: Tent });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch booking details', details: err });
  }
});


router.post(
  '/',
  [
    check('customer_name')
      .notEmpty().withMessage('Customer name is required')
      .matches(/^[A-Za-z\s]+$/).withMessage('Customer name must not contain numbers')
      .isLength({ min: 3 }).withMessage('Customer name must be at least 3 characters'),
    check('start_date')
      .isISO8601().withMessage('Start date must be a valid date')
      .custom((value, { req }) => {
        if (new Date(value) <= new Date()) {
          throw new Error('Start date must be in the future');
        }
        return true;
      }),
    check('end_date')
      .isISO8601().withMessage('End date must be a valid date')
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.start_date)) {
          throw new Error('End date must be after the start date');
        }
        return true;
      }),
    check('tent_id')
      .isInt().withMessage('Tent ID must be a number')
      .custom(async (value) => {
        const tent = await Tent.findByPk(value);
        if (!tent) {
          throw new Error('Tent not found');
        }
        return true;
      }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { customer_name, start_date, end_date, tent_id } = req.body;
      const newBooking = await Booking.create({ customer_name, start_date, end_date, tent_id });
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create booking', details: err });
    }
  }
);

router.put(
  '/:id',
  [
    check('customer_name')
      .optional()
      .matches(/^[A-Za-z\s]+$/).withMessage('Customer name must not contain numbers')
      .isLength({ min: 3 }).withMessage('Customer name must be at least 3 characters'),
    check('start_date')
      .optional()
      .isISO8601().withMessage('Start date must be a valid date')
      .custom((value, { req }) => {
        if (value && new Date(value) <= new Date()) {
          throw new Error('Start date must be in the future');
        }
        return true;
      }),
    check('end_date')
      .optional()
      .isISO8601().withMessage('End date must be a valid date')
      .custom((value, { req }) => {
        if (value && new Date(value) <= new Date(req.body.start_date)) {
          throw new Error('End date must be after the start date');
        }
        return true;
      }),
    check('tent_id')
      .optional()
      .isInt().withMessage('Tent ID must be a number')
      .custom(async (value) => {
        if (value) {
          const tent = await Tent.findByPk(value);
          if (!tent) {
            throw new Error('Tent not found');
          }
        }
        return true;
      }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { customer_name, start_date, end_date, tent_id } = req.body;

      const booking = await Booking.findByPk(id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      booking.customer_name = customer_name || booking.customer_name;
      booking.start_date = start_date || booking.start_date;
      booking.end_date = end_date || booking.end_date;
      booking.tent_id = tent_id || booking.tent_id;
      await booking.save();

      res.json(booking);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update booking', details: err });
    }
  }
);

module.exports = router;
