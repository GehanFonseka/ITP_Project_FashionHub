const mongoose = require('mongoose');

// Define the schema for Mens Blazer
const mensBlazerSchema = new mongoose.Schema({
  sellerNo: { type: Number, required: true },
  itemNo: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

// Create and export the model for Mens Blazer with the new name
module.exports = mongoose.model('RMMensBlazerModel', mensBlazerSchema);
