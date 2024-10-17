const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orders");

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { orderId, dateOfOrder, orderedItems } = req.body;

    // Validate item IDs and shop IDs
    const invalidItems = orderedItems.filter(
      (item) =>
        !mongoose.isValidObjectId(item.itemId) ||
        !mongoose.isValidObjectId(item.shopId)
    );
    if (invalidItems.length > 0) {
      return res
        .status(400)
        .json({ message: "Invalid item IDs or shop IDs provided." });
    }

    // Validate the price is a positive number
    const invalidPrices = orderedItems.filter((item) => item.price <= 0);
    if (invalidPrices.length > 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number." });
    }

    const order = new Order({ orderId, dateOfOrder, orderedItems });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Failed to create order:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create order", error: error.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
});

// Get an order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.error("Failed to fetch order:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Failed to delete order:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
});
// Define the /bulk route
router.post("/bulk", async (req, res) => {
  try {
    const orders = req.body;
    if (!Array.isArray(orders) || orders.length === 0)
      return res
        .status(400)
        .json({ message: "Invalid input: Please provide an array of orders." });

    // Validate orders
    const invalidOrders = orders.filter(
      (order) =>
        !order.orderId ||
        !order.dateOfOrder ||
        !Array.isArray(order.orderedItems)
    );
    if (invalidOrders.length > 0) {
      return res.status(400).json({ message: "Invalid order data provided." });
    }

    const createdOrders = await Order.insertMany(orders);
    res
      .status(201)
      .json({ message: "Orders created successfully", orders: createdOrders });
  } catch (error) {
    console.error("Failed to create orders:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create orders", error: error.message });
  }
});

module.exports = router;
