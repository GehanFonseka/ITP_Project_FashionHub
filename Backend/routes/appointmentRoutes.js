const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');

// Route to create an appointment
router.post('/', createAppointment);

// Route to get all appointments
router.get('/', getAppointments);

// Route to update an appointment by ID
router.put('/:id', updateAppointment);

// Route to delete an appointment by ID
router.delete('/:id', deleteAppointment);

module.exports = router;
