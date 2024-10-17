const mongoose = require('mongoose');

const chainsAndBraceletsSchema = new mongoose.Schema({
  sellerNo: { type: Number, required: true },
  itemNo: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('ChainsAndBracelets', chainsAndBraceletsSchema);
