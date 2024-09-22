const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getTotalService 
 
} = require('../controllers/serviceController');

// Route to create a new service
router.post('/', createService);

// Route to get all services
router.get('/', getAllServices);

// Route to update a service by ID
router.put('/:id', updateService);

// Route to delete a service by ID
router.delete('/:id', deleteService);

// Route to get total services (optional)
router.get('/total', getTotalService); 

router.get('/service-popularity', async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments
    const serviceCounts = {};

    appointments.forEach((appt) => {
      appt.services.forEach((service) => {
        serviceCounts[service] = (serviceCounts[service] || 0) + 1; // Count services
      });
    });

    res.json(serviceCounts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

 


module.exports = router;
