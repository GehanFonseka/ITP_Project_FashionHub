const Boots = require('../models/BootsModel'); // Update the model path as necessary
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

// Create a new boots item
const createBoots = async (req, res) => {
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
      const newBoots = new Boots({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        image,
      });

      await newBoots.save();
      res.status(201).json(newBoots);
    } catch (error) {
      console.error('Error creating boots:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all boots items
const getBoots = async (req, res) => {
  try {
    const bootsItems = await Boots.find();
    res.status(200).json(bootsItems);
  } catch (error) {
    console.error('Error fetching boots:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific boots item by ID
const getBootsById = async (req, res) => {
  try {
    const bootsItem = await Boots.findById(req.params.id);
    if (!bootsItem) {
      return res.status(404).json({ message: 'Boots item not found' });
    }
    res.status(200).json(bootsItem);
  } catch (error) {
    console.error('Error fetching boots by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a boots item
const updateBoots = async (req, res) => {
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
      const updatedBoots = await Boots.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, image },
        { new: true, runValidators: true }
      );

      if (!updatedBoots) {
        return res.status(404).json({ message: 'Boots item not found' });
      }

      res.status(200).json(updatedBoots);
    } catch (error) {
      console.error('Error updating boots:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a boots item
const deleteBoots = async (req, res) => {
  try {
    const bootsItem = await Boots.findByIdAndDelete(req.params.id);
    if (!bootsItem) {
      return res.status(404).json({ message: 'Boots item not found' });
    }
    res.status(200).json({ message: 'Boots item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting boots item', error });
  }
};

module.exports = {
  createBoots,
  getBoots,
  getBootsById,
  updateBoots,
  deleteBoots,
};
