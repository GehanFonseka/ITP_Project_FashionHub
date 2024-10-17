const ChainsAndBracelets = require('../models/ChainsandBraceletsModel');
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

// Create a new chains and bracelets item
const createChainsAndBracelets = async (req, res) => {
  console.log("req", req);
  upload(req, res, async () => {
    const { sellerNo, itemNo, name, price, description } = req.body;
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const image = req.file ? req.file.filename : null;

    if (!sellerNo || !itemNo || !name || !price || !description || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, image) are required.' });
    }

    try {
      const newChainsAndBracelets = new ChainsAndBracelets({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        image,
      });

      await newChainsAndBracelets.save();
      res.status(201).json(newChainsAndBracelets);
    } catch (error) {
      console.error('Error creating chains and bracelets:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all chains and bracelets items
const getChainsAndBracelets = async (req, res) => {
  try {
    const chainsAndBraceletsItems = await ChainsAndBracelets.find();
    res.status(200).json(chainsAndBraceletsItems);
  } catch (error) {
    console.error('Error fetching chains and bracelets:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific chains and bracelets item by ID
const getChainsAndBraceletsById = async (req, res) => {
  try {
    const chainsAndBraceletsItem = await ChainsAndBracelets.findById(req.params.id);
    if (!chainsAndBraceletsItem) {
      return res.status(404).json({ message: 'Chains and Bracelets item not found' });
    }
    res.status(200).json(chainsAndBraceletsItem);
  } catch (error) {
    console.error('Error fetching chains and bracelets by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a chains and bracelets item
const updateChainsAndBracelets = async (req, res) => {
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
      const updatedChainsAndBracelets = await ChainsAndBracelets.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, image },
        { new: true, runValidators: true }
      );

      if (!updatedChainsAndBracelets) {
        return res.status(404).json({ message: 'Chains and Bracelets item not found' });
      }

      res.status(200).json(updatedChainsAndBracelets);
    } catch (error) {
      console.error('Error updating chains and bracelets:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a chains and bracelets item
const deleteChainsAndBracelets = async (req, res) => {
  try {
    const chainsAndBraceletsItem = await ChainsAndBracelets.findByIdAndDelete(req.params.id);
    if (!chainsAndBraceletsItem) {
      return res.status(404).json({ message: 'Chains and Bracelets item not found' });
    }
    res.status(200).json({ message: 'Chains and Bracelets item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chains and bracelets item', error });
  }
};

module.exports = {
  createChainsAndBracelets,
  getChainsAndBracelets,
  getChainsAndBraceletsById,
  updateChainsAndBracelets,
  deleteChainsAndBracelets,
};
