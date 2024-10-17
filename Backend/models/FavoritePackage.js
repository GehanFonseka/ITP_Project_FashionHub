// models/FavoritePackage.js
const mongoose = require("mongoose");

const favoritePackageSchema = new mongoose.Schema({
  items: {
    shirt: { type: mongoose.Schema.Types.ObjectId, ref: "WCTShirt" },  
    trouser: { type: mongoose.Schema.Types.ObjectId, ref: "Pants" },
    shoe: { type: mongoose.Schema.Types.ObjectId, ref: "Sneakers" },
  },
  budget: { type: Number, required: true }, // New budget field
  name: { type: String, required: true } // New package name field
});

const FavoritePackage = mongoose.model(
  "FavoritePackage",
  favoritePackageSchema
);
module.exports = FavoritePackage;
