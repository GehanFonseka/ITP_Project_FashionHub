const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  services: [String],
  requests: { type: String, required: false }, // Change to String for requests
  totalCost: { type: Number, required: true }, // Correctly define totalCost
  inCart: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
