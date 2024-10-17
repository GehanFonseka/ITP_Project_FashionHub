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

const CheckDSchema = new mongoose.Schema(
  {
    

    items: [itemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Checkout", CheckDSchema);


