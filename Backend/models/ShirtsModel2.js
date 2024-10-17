const mongoose = require('mongoose');

// Define the schema for Mens Blazer
const wctshirtsSchema = new mongoose.Schema({
  name: { type: String  },
  price: { type: Number},
  category: { type: Number},
  images: [String],
});

// Create and export the model for Mens Blazer with the new name
module.exports = mongoose.model('WCTShirt', wctshirtsSchema);
