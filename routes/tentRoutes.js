const express = require('express');
const { check, validationResult } = require('express-validator');
const { Tent } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

// Helper function for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all tents
router.get('/', async (req, res) => {
  try {

    const tents = await Tent.findAll({
      order: [['capacity', 'ASC'], ['price_per_day', 'ASC']], 
    });

    res.json(tents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tents' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tent = await Tent.findByPk(id);
    if (!tent) {
      return res.status(404).json({ error: 'Tent not found' });
    }
    res.json(tent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tent details', details: err });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { name, capacity, price_per_day } = req.query;

    const whereClause = {};
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (capacity) {
      whereClause.capacity = { [Op.gte]: capacity };
    }
    if (price_per_day) {
      whereClause.price_per_day = { [Op.lte]: price_per_day };
    }

    const tent = await Tent.findAll({
      where: whereClause,
      order: [['capacity', 'ASC'] , ['price_per_day', 'ASC']],
    });

    if (!tent) {
      return res.status(404).json({ message: 'No tent found matching the criteria' });
    }

    res.json(tent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search tents', details: err });
  }
});

router.get('/paginated', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: 'Limit must be a positive number' });
    }
    if (isNaN(offset) || offset < 0) {
      return res.status(400).json({ error: 'Offset must be a non-negative number' });
    }

    const tents = await Tent.findAll({
      limit: parseInt(limit, 10), 
      offset: parseInt(offset, 10),
      order: [['capacity', 'ASC'], ['price_per_day', 'ASC']], 
    });

    res.json(tents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tents with pagination', details: err });
  }
});


router.post(
  '/',
  [
    check('name')
      .notEmpty().withMessage('Tent name is required')
      .matches(/^[A-Za-z\s]+$/).withMessage('Tent name must not contain numbers')
      .isLength({ min: 3 }).withMessage('Tent name must be at least 3 characters long'),
    check('capacity')
      .isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    check('price_per_day')
      .isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, capacity, price_per_day } = req.body;
      const newTent = await Tent.create({ name, capacity, price_per_day });
      res.status(201).json(newTent);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create tent', details: err });
    }
  }
);

// PUT update an existing tent with validation
router.put(
  '/:id',
  [
    check('name')
      .optional()
      .matches(/^[A-Za-z\s]+$/).withMessage('Tent name must not contain numbers')
      .isLength({ min: 3 }).withMessage('Tent name must be at least 3 characters long'),
    check('capacity')
      .optional()
      .isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    check('price_per_day')
      .optional()
      .isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, capacity, price_per_day } = req.body;

      const tent = await Tent.findByPk(id);
      if (!tent) {
        return res.status(404).json({ error: 'Tent not found' });
      }

      tent.name = name || tent.name;
      tent.capacity = capacity || tent.capacity;
      tent.price_per_day = price_per_day || tent.price_per_day;
      await tent.save();

      res.json(tent);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update tent', details: err });
    }
  }
);

// DELETE an existing tent
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tent = await Tent.findByPk(id);
    if (!tent) {
      return res.status(404).json({ error: 'Tent not found' });
    }

    await tent.destroy();
    res.json({ message: 'Tent deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tent', details: err });
  }
});

module.exports = router;
