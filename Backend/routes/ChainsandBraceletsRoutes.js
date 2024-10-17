const express = require('express');
const router = express.Router();
const { 
  createChainsAndBracelets, 
  getChainsAndBracelets, 
  getChainsAndBraceletsById, 
  updateChainsAndBracelets, 
  deleteChainsAndBracelets 
} = require('../controllers/ChainsandBraceletsController');

// Handles POST request to create chains and bracelets
router.post('/', createChainsAndBracelets);

// Handles GET request to get all chains and bracelets
router.get('/', getChainsAndBracelets);

// Handles GET request to get chains and bracelets by ID
router.get('/:id', getChainsAndBraceletsById);

// Handles PUT request to update chains and bracelets
router.put('/:id', updateChainsAndBracelets);

// Handles DELETE request to delete chains and bracelets
router.delete('/:id', deleteChainsAndBracelets);

module.exports = router;
