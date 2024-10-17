const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment,getTotalAppointment,getTodaysAppointments,} = require('../controllers/appointmentController');

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



// Route to get today's appointments
router.get('/today', getTodaysAppointments);

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
  
  
router.get('/api/appointment-stats', async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    const matchConditions = {};
    if (startDate) matchConditions.date = { $gte: startDate };
    if (endDate) matchConditions.date = { ...matchConditions.date, $lte: endDate };

    const appointments = await Appointment.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: { $hour: '$date' }, // Group by hour of the appointment time
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by the hour of the day
    ]);

    res.json(appointments);
  } catch (error) {
    res.status(500).send('Error fetching appointment statistics');
  }
});

module.exports = router;