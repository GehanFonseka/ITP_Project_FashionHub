const express = require('express');
const {
  CheckOutcrete,
  deleted,
  deleteItems,
  deleteItemss,
  getAlloder,
  getCartItem,
  getcheckdetails,
  Itcreate,
  ordercreated,
  getLastOrder,
  getLastOrderL,
  clearCart
} = require('../controllers/items.controller')

const router = express.Router();

// Cart routes
router.post('/cart', Itcreate); // Add item to cart
router.get('/cart', getCartItem); // Get all cart items
router.delete('/cart/:itemsId', deleteItems); // Delete a cart item by ID
router.delete('/cart/clear', clearCart); // Clear the cart


// Checkout routes
router.post('/checkout', CheckOutcrete); // Create a checkout record
router.get('/checkout', getcheckdetails); // Get all checkout details
router.delete('/checkout/clear', deleteItemss); // Clear the checkout
router.get('/checkout/last', getLastOrder);

// Order routes
router.post('/orders', ordercreated); // Create an order
router.get('/orders', getAlloder); // Get all orders
router.delete('/orders/:ItId', deleted); // Delete an order by ID
router.get('/orders/last', getLastOrderL);

module.exports = router;
