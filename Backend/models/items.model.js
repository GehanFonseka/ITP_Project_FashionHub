const mongoose = require('mongoose')


const ItemsSchema = new mongoose.Schema({
 
  ItemsN: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  image: {
   type:[ String],
   required: true
  },

  sellerNo: {
    type: Number, 
    
  },
  
});


module.exports = mongoose.model('Items', ItemsSchema);

