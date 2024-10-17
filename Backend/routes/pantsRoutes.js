const express = require('express');
const router = express.Router();
const { createPants, getPants, getPantsById, updatePants, deletePants } = require('../controllers/pantsController');

router.post('/', createPants); // Handles POST request to create pants
router.get('/', getPants); // Handles GET request to get all pants
router.get('/:id', getPantsById); // Handles GET request to get pants by ID
router.put('/:id', updatePants); // Handles PUT request to update pants
router.delete('/:id', deletePants); // Handles DELETE request to delete pants

module.exports = router;
