const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Hair', 'Facial', 'Nail', 'Makeup', 'Massage']
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Service', serviceSchema);
