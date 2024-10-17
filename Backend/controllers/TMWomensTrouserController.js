const TMWomensTrouser = require('../models/TMWomensTrouserModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('image');

// Create a new women's tailor-made trouser item
const createTMWomensTrouser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!sellerNo || !itemNo || !name || !price || !description || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, image) are required.' });
    }

    try {
      const newTMWomensTrouser = new TMWomensTrouser({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        image,
      });

      await newTMWomensTrouser.save();
      res.status(201).json(newTMWomensTrouser);
    } catch (error) {
      console.error('Error creating women\'s tailor-made trouser:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all women's tailor-made trousers items
const getTMWomensTrousers = async (req, res) => {
  try {
    const womensTrousers = await TMWomensTrouser.find();
    res.status(200).json(womensTrousers);
  } catch (error) {
    console.error('Error fetching women\'s tailor-made trousers:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific women's tailor-made trouser item by ID
const getTMWomensTrouserById = async (req, res) => {
  try {
    const womensTrouser = await TMWomensTrouser.findById(req.params.id);
    if (!womensTrouser) {
      return res.status(404).json({ message: 'Women\'s tailor-made trouser not found' });
    }
    res.status(200).json(womensTrouser);
  } catch (error) {
    console.error('Error fetching women\'s tailor-made trouser by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a women's tailor-made trouser item
const updateTMWomensTrouser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    if (!sellerNo || !itemNo || !name || !price || !description || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, image) are required for update.' });
    }

    try {
      const updatedTMWomensTrouser = await TMWomensTrouser.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, image },
        { new: true, runValidators: true }
      );

      if (!updatedTMWomensTrouser) {
        return res.status(404).json({ message: 'Women\'s tailor-made trouser not found' });
      }

      res.status(200).json(updatedTMWomensTrouser);
    } catch (error) {
      console.error('Error updating women\'s tailor-made trouser:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a women's tailor-made trouser item
const deleteTMWomensTrouser = async (req, res) => {
  try {
    const womensTrouser = await TMWomensTrouser.findByIdAndDelete(req.params.id);
    if (!womensTrouser) {
      return res.status(404).json({ message: 'Women\'s tailor-made trouser not found' });
    }
    res.status(200).json({ message: 'Women\'s tailor-made trouser deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting women\'s tailor-made trouser', error });
  }
};

module.exports = {
  createTMWomensTrouser,
  getTMWomensTrousers,
  getTMWomensTrouserById,
  updateTMWomensTrouser,
  deleteTMWomensTrouser,
};
