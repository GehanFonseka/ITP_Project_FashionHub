const express = require('express');
const router = express.Router();
const { createSneakers, getSneakers, getSneakersById, updateSneakers, deleteSneakers } = require('../controllers/sneakersController');

router.post('/', createSneakers); // Handles POST request to create sneakers
router.get('/', getSneakers); // Handles GET request to get all sneakers
router.get('/:id', getSneakersById); // Handles GET request to get sneakers by ID
router.put('/:id', updateSneakers); // Handles PUT request to update sneakers
router.delete('/:id', deleteSneakers); // Handles DELETE request to delete sneakers

module.exports = router;
