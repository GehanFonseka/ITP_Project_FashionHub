
const WCTShirt = require('../models/WCTShirtModel');
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

// Create a new women's casual t-shirt item
const createWCTShirt = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description, quantity} = req.body;
    const image = req.file ? req.file.filename : null;

    if (!sellerNo || !itemNo || !name || !price || !description || !quantity || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, quantity, image) are required.' });
    }

    try {
      const newWCTShirt = new WCTShirt({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        quantity,
        image,
      });

      await newWCTShirt.save();
      res.status(201).json(newWCTShirt);
    } catch (error) {
      console.error('Error creating WCTShirt:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all women's casual t-shirt items
const getWCTShirts = async (req, res) => {
  try {
    const wctShirts = await WCTShirt.find();
    res.status(200).json(wctShirts);
  } catch (error) {
    console.error('Error fetching WCTShirts:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific women's casual t-shirt item by ID
const getWCTShirtById = async (req, res) => {
  try {
    const wctShirt = await WCTShirt.findById(req.params.id);
    if (!wctShirt) {
      return res.status(404).json({ message: 'WCTShirt item not found' });
    }
    res.status(200).json(wctShirt);
  } catch (error) {
    console.error('Error fetching WCTShirt by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a women's casual t-shirt item
const updateWCTShirt = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description, quantity} = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    if (!sellerNo || !itemNo || !name || !price || !description || !quantity || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, quantity, image) are required for update.' });
    }

    try {
      const updatedWCTShirt = await WCTShirt.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, quantity, image },
        { new: true, runValidators: true }
      );

      if (!updatedWCTShirt) {
        return res.status(404).json({ message: 'WCTShirt item not found' });
      }

      res.status(200).json(updatedWCTShirt);
    } catch (error) {
      console.error('Error updating WCTShirt:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a women's casual t-shirt item
const deleteWCTShirt = async (req, res) => {
  try {
    const wctShirt = await WCTShirt.findByIdAndDelete(req.params.id);
    if (!wctShirt) {
      return res.status(404).json({ message: 'WCTShirt item not found' });
    }
    res.status(200).json({ message: 'WCTShirt item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting WCTShirt item', error });
  }
};

module.exports = {
  createWCTShirt,
  getWCTShirts,
  getWCTShirtById,
  updateWCTShirt,
  deleteWCTShirt,
};
