const Appointment = require('../models/appointmentModel');

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { services, ...appointmentData } = req.body; // Extract services from request body
    const newAppointment = new Appointment({ ...appointmentData, services });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Get all appointments with populated services
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('services'); // Populate services
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
    ).populate('services'); // Populate services after update
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
    res.status(200).json({ totalAppointment: appointmentCount });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating total appointments', error: error.message });
  }
};

//get today's appointments
const getTodaysAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayAppointments = await Appointment.find({
      date: { $gte: today, $lt: tomorrow },
    });

    res.status(200).json(todayAppointments);
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    res.status(500).json({ message: "Error fetching today's appointments", error: error.message });
  }
};



// Get service statistics
const servicestats = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('services');

    const serviceCount = {};
    appointments.forEach(appt => {
      if (appt.services && appt.services.length) {
        appt.services.forEach(service => {
          const category = service.category;
          serviceCount[category] = (serviceCount[category] || 0) + 1;
        });
      }
    });

    res.status(200).json(serviceCount);
  } catch (error) {
    console.error('Error fetching service statistics:', error);
    res.status(500).json({ error: 'Failed to fetch service statistics' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getTotalAppointment,
  servicestats,
  getTodaysAppointments,
};
