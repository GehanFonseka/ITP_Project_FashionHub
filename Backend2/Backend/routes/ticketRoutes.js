const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create a new ticket (C)
router.post('/tickets', async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all tickets (R)
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read a single ticket by ID (R)
router.get('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a ticket (U)
router.put('/tickets/:id', async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a ticket (D)
router.delete('/tickets/:id', async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
