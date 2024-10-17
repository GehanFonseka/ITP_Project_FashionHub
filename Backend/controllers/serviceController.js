const Service = require('../models/Service'); // Ensure this path is correct


// Create a new service
const createService = async (req, res) => {
  const { category, name, description, price } = req.body;

  if (!category || !name || !price) {
    return res.status(400).json({ error: 'Category, name, and price are required' });
  }

  try {
    const newService = new Service({ category, name, description, price });
    await newService.save();
    return res.status(201).json(newService); // Return the created service directly
  } catch (error) {
    console.error('Error in createService:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    console.error('Error in getAllServices:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a service
const updateService = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.status(200).json({ updatedService });
  } catch (error) {
    console.error('Error in updateService:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error in deleteService:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTotalService = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments(); // Count the number of documents in the collection
    return res.status(200).json({ totalServices }); // Return the total services with the key 'totalServices'
  } catch (error) {
    console.error('Error in getTotalService:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getTotalService,
};
