const Officeshoes = require('../models/OfficeshoesModel');
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

// Create a new office shoes item
const createOfficeshoes = async (req, res) => {
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
      const newOfficeshoes = new Officeshoes({
        sellerNo,
        itemNo,
        name,
        price,
        description,
        image,
      });

      await newOfficeshoes.save();
      res.status(201).json(newOfficeshoes);
    } catch (error) {
      console.error('Error creating office shoes:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all office shoes items
const getOfficeshoes = async (req, res) => {
  try {
    const officeshoesItems = await Officeshoes.find();
    res.status(200).json(officeshoesItems);
  } catch (error) {
    console.error('Error fetching office shoes:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a specific office shoes item by ID
const getOfficeshoesById = async (req, res) => {
  try {
    const officeshoesItem = await Officeshoes.findById(req.params.id);
    if (!officeshoesItem) {
      return res.status(404).json({ message: 'Office shoes item not found' });
    }
    res.status(200).json(officeshoesItem);
  } catch (error) {
    console.error('Error fetching office shoes by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update an office shoes item
const updateOfficeshoes = async (req, res) => {
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
      const updatedOfficeshoes = await Officeshoes.findByIdAndUpdate(
        req.params.id,
        { sellerNo, itemNo, name, price, description, image },
        { new: true, runValidators: true }
      );

      if (!updatedOfficeshoes) {
        return res.status(404).json({ message: 'Office shoes item not found' });
      }

      res.status(200).json(updatedOfficeshoes);
    } catch (error) {
      console.error('Error updating office shoes:', error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete an office shoes item
const deleteOfficeshoes = async (req, res) => {
  try {
    const officeshoesItem = await Officeshoes.findByIdAndDelete(req.params.id);
    if (!officeshoesItem) {
      return res.status(404).json({ message: 'Office shoes item not found' });
    }
    res.status(200).json({ message: 'Office shoes item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting office shoes item', error });
  }
};

module.exports = {
  createOfficeshoes,
  getOfficeshoes,
  getOfficeshoesById,
  updateOfficeshoes,
  deleteOfficeshoes,
};
