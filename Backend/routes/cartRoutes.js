const express = require("express");
const Cart = require("../models/cartModel"); // Import the Cart model
const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  const { ItemsN, price, quantity, image, sellerNo } = req.body;

  try {
    const newCartItem = new Cart({
      ItemsN,
      price,
      quantity,
      image,
      sellerNo,
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

module.exports = router;
