const MensBlazer = require('../models/RMMensBlazerModel');
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

// Create a new mens blazer item
const createMensBlazer = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description, quantity,} = req.body;
    const image = req.file ? req.file.filename : null;

    if (!sellerNo || !itemNo || !name || !price || !description || !quantity || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, quantity, image) are required.' });
    }

    try {
      const newMensBlazer = new MensBlazer({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        quantity,
        image,
      });

      await newMensBlazer.save();
      res.status(201).json(newMensBlazer);
    } catch (error) {
      console.error('Error creating mens blazer:', error.message);
      res.status(400).json({ error: error.message });
    }
  });

};

// Get all mens blazer items
const getMensBlazers = async (req, res) => {
  try {
    const mensBlazers = await MensBlazer.find();
    res.status(200).json(mensBlazers);
  } catch (error) {
    console.error('Error fetching mens blazers:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific mens blazer item by ID
const getMensBlazerById = async (req, res) => {
  try {
    const mensBlazer = await MensBlazer.findById(req.params.id);
    if (!mensBlazer) {
      return res.status(404).json({ message: 'Mens blazer item not found' });
    }
    res.status(200).json(mensBlazer);
  } catch (error) {
    console.error('Error fetching mens blazer by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a mens blazer item
const updateMensBlazer = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description, quantity } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    if (!sellerNo || !itemNo || !name || !price || !description || !quantity || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, image, quantity) are required for update.' });
    }

    try {
      const updatedMensBlazer = await MensBlazer.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, quantity, image },
        { new: true, runValidators: true }
      );

      if (!updatedMensBlazer) {
        return res.status(404).json({ message: 'Mens blazer item not found' });
      }

      res.status(200).json(updatedMensBlazer);
    } catch (error) {
      console.error('Error updating mens blazer:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a mens blazer item
const deleteMensBlazer = async (req, res) => {
  try {
    const mensBlazer = await MensBlazer.findByIdAndDelete(req.params.id);
    if (!mensBlazer) {
      return res.status(404).json({ message: 'Mens blazer item not found' });
    }
    res.status(200).json({ message: 'Mens blazer item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mens blazer item', error });
  }
};

module.exports = {
  createMensBlazer,
  getMensBlazers,
  getMensBlazerById,
  updateMensBlazer,
  deleteMensBlazer,
};
