const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  ItemsN: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  sellerNo: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Cart', CartSchema);
