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



 


module.exports = router;
