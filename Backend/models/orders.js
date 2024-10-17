const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfOrder: {
    type: Date,
    required: true,
  },
  orderedItems: [
    {
      itemId: {
        type: String, // Reference to custom itemId from the Item schema
        required: true,
      },
      shopId: {
        type: String, // Reference to shopId
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
