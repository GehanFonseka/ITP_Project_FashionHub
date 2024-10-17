const express = require('express');
const router = express.Router();
const reportController = require('../controllers/footwearcontroller');

// Route to get the report
router.get('/', reportController.getReport);

module.exports = router;
