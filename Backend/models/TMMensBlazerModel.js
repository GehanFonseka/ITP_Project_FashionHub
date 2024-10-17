const mongoose = require('mongoose');

// Define the schema for Mens Blazer
const mensBlazerSchema = new mongoose.Schema({
  sellerNo: { type: Number, required: true },
  itemNo: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Create and export the model for Mens Blazer
module.exports = mongoose.model('MensBlazer', mensBlazerSchema);
