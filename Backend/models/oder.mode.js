const mongoose = require('mongoose')




const itemSchema = new mongoose.Schema({
    ItemsN: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sellerNo: {
      type: Number, 
      
    },
  });

const orderSchema = new mongoose.Schema({
  

  email: {
    type: String,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
  },
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
   Apartment: {
    type: String,
    required: true,
  },

  City: {
    type: String,
    required: true,
  },
  Postal: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },

  CardN: {
    type: String,
    required: true,
  },
  Exdate: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
 
 

  items: [itemSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  
});

module.exports = mongoose.model("NewOrder", orderSchema);

