import express from 'express';
import Items from '../models/items.model.js';

const router = express.Router(); // Initialize the router

// POST: Create a new item
router.post('/items', async (req, res) => {
  const { ItemsN, price, quantity, image } = req.body;

  try {
    const newItem = new Items({ ItemsN, price, quantity, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all items
router.get('/items', async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a single item by ID
router.get('/items/:id', async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an item by ID
router.put('/items/:id', async (req, res) => {
  const { ItemsN, price, quantity, image } = req.body;

  try {
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, { ItemsN, price, quantity, image }, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an item by ID
router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Items.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router }; // Named export of the router
