const Pants = require('../models/pantsModel');
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

// Create a new pants item
const createPants = async (req, res) => {
  console.log("req",req)
  upload(req, res, async () => {
    // if (err) {
    //   return res.status(400).json({ error: 'Error uploading image' });
    // }

    const { sellerNo, itemNo, name, price, description, quantity,} = req.body;
    console.log("req.body",req.body)
    console.log("req.file",req.file)
    const image = req.file ? req.file.filename : null;

    if (!sellerNo || !itemNo || !name || !price || !description || !quantity || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, quantity, image) are required.' });
    }

    try {
      const newPants = new Pants({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        quantity,
        image,
      });

      await newPants.save();
      res.status(201).json(newPants);
    } catch (error) {
      console.error('Error creating pants:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all pants items
const getPants = async (req, res) => {
  try {
    const pantsItems = await Pants.find();
    res.status(200).json(pantsItems);
  } catch (error) {
    console.error('Error fetching pants:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific pants item by ID
const getPantsById = async (req, res) => {
  try {
    const pantsItem = await Pants.findById(req.params.id);
    if (!pantsItem) {
      return res.status(404).json({ message: 'Pants item not found' });
    }
    res.status(200).json(pantsItem);
  } catch (error) {
    console.error('Error fetching pants by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a pants item
const updatePants = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    const { sellerNo, itemNo, name, price, description, quantity } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    if (!sellerNo || !itemNo || !name || !price || !description || !quantity || !image) {
      return res.status(400).json({ error: 'All fields (sellerNo, itemNo, name, price, description, quantity, image) are required for update.' });
    }

    try {
      const updatedPants = await Pants.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, quantity, image },
        { new: true, runValidators: true }
      );

      if (!updatedPants) {
        return res.status(404).json({ message: 'Pants item not found' });
      }

      res.status(200).json(updatedPants);
    } catch (error) {
      console.error('Error updating pants:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a pants item
const deletePants = async (req, res) => {
  try {
    const pantsItem = await Pants.findByIdAndDelete(req.params.id);
    if (!pantsItem) {
      return res.status(404).json({ message: 'Pants item not found' });
    }
    res.status(200).json({ message: 'Pants item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pants item', error });
  }
};

module.exports = {
  createPants,
  getPants,
  getPantsById,
  updatePants,
  deletePants,
};
