const express = require("express");
const router = express.Router();
const FavoritePackage = require("../models/FavoritePackage");

// Save a new favorite package

router.post("/save", async (req, res) => {
  try {
    const { items, budget, name } = req.body; // Get name from request body

    // Validate items, budget, and name
    if (!items || typeof budget !== "number" || budget < 0 || !name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Items, a valid non-negative budget, and a name are required" });
    }

    // Validate individual item IDs
    const validItemIds = [items.shirt, items.trouser, items.shoe].filter(
      (id) => id !== null
    );
    if (
      validItemIds.length &&
      !validItemIds.every((id) => id.match(/^[0-9a-fA-F]{24}$/))
    ) {
      return res.status(400).json({ error: "Invalid item ID format" });
    }

    // Create and save the new package
    const newPackage = new FavoritePackage({ items, budget, name });
    await newPackage.save();
    res.status(201).json(newPackage); // Return the newly created package
  } catch (error) {
    console.error("Error saving favorite package:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while saving the favorite package" });
  }
});


// Get a specific favorite package by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid package ID format" });
    }

    // Fetch and populate favorite package
    const favoritePackage = await FavoritePackage.findById(id).populate(
      "items.shirt items.trouser items.shoe"
    );

    if (!favoritePackage) {
      return res.status(404).json({ error: "Favorite package not found" });
    }

    res.json(favoritePackage);
  } catch (error) {
    console.error("Error fetching favorite package:", error.message);
    res
      .status(500)
      .json({
        error: "An error occurred while retrieving the favorite package",
      });
  }
});

// Get all favorite packages
router.get("/", async (req, res) => {
  try {
    // Fetch all favorite packages and populate items
    const favoritePackages = await FavoritePackage.find().populate(
      "items.shirt items.trouser items.shoe"
    );

    if (!favoritePackages.length) {
      return res.status(404).json({ error: "No favorite packages found" });
    }

    res.json(favoritePackages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "An error occurred while retrieving all favorite packages",
      });
  }
});

// Update a specific favorite package
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { items, budget } = req.body;

    // Validate items and budget
    if (!items || typeof budget !== "number" || budget < 0) {
      return res
        .status(400)
        .json({ error: "Items and a valid non-negative budget are required" });
    }

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid package ID format" });
    }

    // Update the favorite package
    const updatedPackage = await FavoritePackage.findByIdAndUpdate(
      id,
      { items, budget },
      { new: true }
    ).populate("items.shirt items.trouser items.shoe");

    if (!updatedPackage) {
      return res.status(404).json({ error: "Favorite package not found" });
    }

    res.json(updatedPackage);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the favorite package" });
  }
});

// Delete a specific favorite package
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid package ID format" });
    }

    // Delete the favorite package
    const deletedPackage = await FavoritePackage.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ error: "Favorite package not found" });
    }

    res.json({ message: "Favorite package deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the favorite package" });
  }
});

// Delete all favorite packages
router.delete("/deleteAll", async (req, res) => {
  try {
    // Delete all favorite packages
    const result = await FavoritePackage.deleteMany({});

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "No favorite packages found to delete" });
    }

    res.json({ message: "All favorite packages deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "An error occurred while deleting all favorite packages",
      });
  }
});

module.exports = router;
