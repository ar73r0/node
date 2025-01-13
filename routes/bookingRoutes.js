// routes/documentationRoutes.js
const express = require('express');
const router = express.Router();

// CRUD endpoints for Booking
router.get('/bookings', async (req, res) => {
    const bookings = await Booking.findAll({ include: Tent });
    res.json(bookings);
});

router.get('/bookings/:id', async (req, res) => {
    const booking = await Booking.findByPk(req.params.id, { include: Tent });
    if (!booking) return res.status(404).send('Booking not found');
    res.json(booking);
});

router.post('/bookings', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/bookings/:id', async (req, res) => {
    try {
        const [updated] = await Booking.update(req.body, {
        where: { id: req.params.id }
        });
        if (!updated) return res.status(404).send('Booking not found');
        const updatedBooking = await Booking.findByPk(req.params.id);
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/bookings/:id', async (req, res) => {
    const deleted = await Booking.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).send('Booking not found');
    res.status(204).send();
});

module.exports = router;
