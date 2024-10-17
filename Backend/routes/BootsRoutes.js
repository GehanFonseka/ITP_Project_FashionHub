const express = require('express');
const router = express.Router();
const { createBoots, getBoots, getBootsById, updateBoots, deleteBoots } = require('../controllers/BootsController');

// Route to create a new boots item
router.post('/', createBoots); // Handles POST request to create boots
// Route to get all boots items
router.get('/', getBoots); // Handles GET request to get all boots
// Route to get a specific boots item by ID
router.get('/:id', getBootsById); // Handles GET request to get boots by ID
// Route to update a boots item by ID
router.put('/:id', updateBoots); // Handles PUT request to update boots
// Route to delete a boots item by ID
router.delete('/:id', deleteBoots); // Handles DELETE request to delete boots

module.exports = router;
