const mongoose = require('mongoose');

const sneakersSchema = new mongoose.Schema({
  name: { type: String  },
  price: { type: Number},
  category: { type: Number},
  images: [String],
});

module.exports = mongoose.model('Sneakers', sneakersSchema);
