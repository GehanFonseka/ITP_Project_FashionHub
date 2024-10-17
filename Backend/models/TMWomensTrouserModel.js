const mongoose = require('mongoose');

// Define the schema for Women's Tailor-Made Trousers
const tmWomensTrouserSchema = new mongoose.Schema({
  sellerNo: { type: Number, required: true },
  itemNo: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Create and export the model for Women's Tailor-Made Trousers
module.exports = mongoose.model('TMWomensTrouser', tmWomensTrouserSchema);
