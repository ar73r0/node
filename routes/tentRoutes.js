// routes/documentationRoutes.js
const express = require('express');
const router = express.Router();

// CRUD endpoints for Tent
router.get('/tents', async (req, res) => {
    const tents = await Tent.findAll();
    res.json(tents);
});
  
router.get('/tents/:id', async (req, res) => {
    const tent = await Tent.findByPk(req.params.id);
    if (!tent) return res.status(404).send('Tent not found');
    res.json(tent);
});
  
router.post('/tents', async (req, res) => {
    try {
      const tent = await Tent.create(req.body);
      res.status(201).json(tent);
    } catch (err) {
      res.status(400).json(err);
    }
});
  
router.put('/tents/:id', async (req, res) => {
    try {
      const [updated] = await Tent.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).send('Tent not found');
      const updatedTent = await Tent.findByPk(req.params.id);
      res.json(updatedTent);
    } catch (err) {
      res.status(400).json(err);
    }
});
  
router.delete('/tents/:id', async (req, res) => {
    const deleted = await Tent.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).send('Tent not found');
    res.status(204).send();
});

module.exports = router;
