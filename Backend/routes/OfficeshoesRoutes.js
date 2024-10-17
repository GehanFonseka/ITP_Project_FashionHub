const express = require('express');
const router = express.Router();
const { 
  createOfficeshoes, 
  getOfficeshoes, 
  getOfficeshoesById, 
  updateOfficeshoes, 
  deleteOfficeshoes 
} = require('../controllers/OfficeshoesController');

router.post('/', createOfficeshoes); // Handles POST request to create office shoes
router.get('/', getOfficeshoes); // Handles GET request to get all office shoes
router.get('/:id', getOfficeshoesById); // Handles GET request to get office shoes by ID
router.put('/:id', updateOfficeshoes); // Handles PUT request to update office shoes
router.delete('/:id', deleteOfficeshoes); // Handles DELETE request to delete office shoes

module.exports = router;
