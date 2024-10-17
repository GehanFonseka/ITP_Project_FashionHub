const express = require('express');
const router = express.Router();
const { getClothingStats } = require('../controllers/clothingController'); 

router.get('/clothing-stats', getClothingStats);

module.exports = router;
