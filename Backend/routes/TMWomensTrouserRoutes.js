const express = require('express');
const router = express.Router();
const {
  createTMWomensTrouser,
  getTMWomensTrousers,
  getTMWomensTrouserById,
  updateTMWomensTrouser,
  deleteTMWomensTrouser
} = require('../controllers/TMWomensTrouserController');

// Route to create a new tailor-made women's trouser
router.post('/', createTMWomensTrouser);

// Route to get all tailor-made women's trousers
router.get('/', getTMWomensTrousers);

// Route to get a specific tailor-made women's trouser by ID
router.get('/:id', getTMWomensTrouserById);

// Route to update a specific tailor-made women's trouser by ID
router.put('/:id', updateTMWomensTrouser);

// Route to delete a specific tailor-made women's trouser by ID
router.delete('/:id', deleteTMWomensTrouser);

module.exports = router;
