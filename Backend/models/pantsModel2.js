const mongoose = require('mongoose');

const pantsSchema = new mongoose.Schema({
  name: { type: String  },
  price: { type: Number},
  category: { type: Number},
  images: [String],
  sellerNo: { type: Number},
});

module.exports = mongoose.model('Pants', pantsSchema);
