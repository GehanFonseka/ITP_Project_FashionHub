const Appointment = require('../models/appointmentModel');

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
    console.log('Updating appointment with ID:', req.params.id);
  console.log('Request body:', req.body);
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an appointment


const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};


// Get total number of appointments
const getTotalAppointment = async (req, res) => {
  try {
    const appointmentCount = await Appointment.countDocuments(); // Count total documents in the collection

    // Return the count of appointments in the response
    res.status(200).json({ totalAppointment: appointmentCount });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating total appointments', error: error.message });
  }
};




module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getTotalAppointment,
};
