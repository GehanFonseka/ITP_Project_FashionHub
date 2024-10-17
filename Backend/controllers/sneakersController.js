const Sneakers = require('../models/sneakersModel');
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

// Create a new sneakers item
const createSneakers = async (req, res) => {
  console.log("req", req);
  upload(req, res, async () => {
    const { sellerNo, itemNo, name, price,quantity, description } = req.body;
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const image = req.file ? req.file.filename : null;

    if (!sellerNo || !itemNo || !name || !price || !quantity|| !description || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, quantity,description, image) are required.' });
    }

    try {
      const newSneakers = new Sneakers({
        sellerNo,
        itemNo,
        name,
        price,
        quantity,
        description,
        image,
      });

      await newSneakers.save();
      res.status(201).json(newSneakers);
    } catch (error) {
      console.error('Error creating sneakers:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all sneakers items
const getSneakers = async (req, res) => {
  try {
    const sneakersItems = await Sneakers.find();
    res.status(200).json(sneakersItems);
  } catch (error) {
    console.error('Error fetching sneakers:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific sneakers item by ID
const getSneakersById = async (req, res) => {
  try {
    const sneakersItem = await Sneakers.findById(req.params.id);
    if (!sneakersItem) {
      return res.status(404).json({ message: 'Sneakers item not found' });
    }
    res.status(200).json(sneakersItem);
  } catch (error) {
    console.error('Error fetching sneakers by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a sneakers item
const updateSneakers = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price,quantity, description } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    if (!sellerNo || !itemNo || !name || !price || !quantity|| !description || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, quantity, description, image) are required for update.' });
    }

    try {
      const updatedSneakers = await Sneakers.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price,quantity, description, image },
        { new: true, runValidators: true }
      );

      if (!updatedSneakers) {
        return res.status(404).json({ message: 'Sneakers item not found' });
      }

      res.status(200).json(updatedSneakers);
    } catch (error) {
      console.error('Error updating sneakers:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a sneakers item
const deleteSneakers = async (req, res) => {
  try {
    const sneakersItem = await Sneakers.findByIdAndDelete(req.params.id);
    if (!sneakersItem) {
      return res.status(404).json({ message: 'Sneakers item not found' });
    }
    res.status(200).json({ message: 'Sneakers item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sneakers item', error });
  }
};

module.exports = {
  createSneakers,
  getSneakers,
  getSneakersById,
  updateSneakers,
  deleteSneakers,
};
