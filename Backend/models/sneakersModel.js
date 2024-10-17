const mongoose = require('mongoose');

const sneakersSchema = new mongoose.Schema({
  sellerNo: { type: Number, required: true },
  itemNo: { type: Number, required: true },
  name: { type: String, required: true },  // Make sure name is in all models
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Sneakers', sneakersSchema);
