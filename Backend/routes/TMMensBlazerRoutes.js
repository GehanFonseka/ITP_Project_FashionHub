const express = require('express');
const router = express.Router();
const {
  createMensBlazer,
  getMensBlazers,
  getMensBlazerById,
  updateMensBlazer,
  deleteMensBlazer
} = require('../controllers/TMMensBlazerController');

router.post('/', createMensBlazer); 
router.get('/', getMensBlazers);
router.get('/:id', getMensBlazerById);
router.put('/:id', updateMensBlazer);
router.delete('/:id', deleteMensBlazer);

module.exports = router;
