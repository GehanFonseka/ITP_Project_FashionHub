const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment,getTotalAppointment} = require('../controllers/appointmentController');

// Route to create an appointment
router.post('/', createAppointment);

// Route to get all appointments
router.get('/', getAppointments);

// Route to update an appointment by ID
router.put('/:id', updateAppointment);

// Route to delete an appointment by ID
router.delete('/:id', deleteAppointment);

//Route to get total appointments for AD
router.get('/total', getTotalAppointment);

// Add an appointment to the cart
router.put('/:id/cart', async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(req.params.id, { inCart: true }, { new: true });
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all appointments in the cart
  router.get('/cart', async (req, res) => {
    try {
      const appointmentsInCart = await Appointment.find({ inCart: true });
      res.status(200).json(appointmentsInCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Remove an appointment from the cart
  router.put('/:id/remove-cart', async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(req.params.id, { inCart: false }, { new: true });
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

module.exports = router;
