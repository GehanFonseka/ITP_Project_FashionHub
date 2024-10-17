const express = require('express');
const router = express.Router();
const {
  createWCTShirt,
  getWCTShirts,
  getWCTShirtById,
  updateWCTShirt,
  deleteWCTShirt
} = require('../controllers/WCTshirtController');

router.post('/', createWCTShirt); // Route to create a new women's casual t-shirt
router.get('/', getWCTShirts); // Route to get all women's casual t-shirts
router.get('/:id', getWCTShirtById); // Route to get a specific women's casual t-shirt by ID
router.put('/:id', updateWCTShirt); // Route to update a specific women's casual t-shirt
router.delete('/:id', deleteWCTShirt); // Route to delete a specific women's casual t-shirt

module.exports = router;
