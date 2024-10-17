const express = require("express");
const router = express.Router();

const Product = require("../models/ShirtsModel2");


router.get("/test",(req, res) => res.send("route is wokring"));

router.post("/", (req, res) => (
    Product.create(req.body)
    .then(() => res.json({msg:"successfully added  "}))
    .catch(()=> res.status(400).json({msg : "adding failed"}))
));

router.get("/", (req, res) => (
    Product.find(req.body)
    .then((Products) => res.json(Products))
    .catch(()=> res.status(400).json({msg : " getting failed"}))
));

router.get("/:id", (req, res) => (
    Product.findById(req.params.id)
    .then((Products) => res.json(Products))
    .catch(()=> res.status(400).json({msg : " getting by id failed"}))
));

router.put("/:id", (req, res) => (
    Product.findByIdAndUpdate(req.params.id,req.body)
    .then(() => res.json({msg: " updated successfully"}))
    .catch(()=> res.status(400).json({msg : " updated failed"}))
));

router.delete("/:id", (req, res) => (
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: " deleted successfully"}))
    .catch(()=> res.status(400).json({msg : " deleting failed"}))
));
router.delete("/", (req, res) => {
  const ids = req.body.ids; // Retrieve the IDs from the request body
  
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ msg: "Invalid request data" });
  }

  Product.deleteMany({ _id: { $in: ids } })
    .then(() => res.json({ msg: "Selected items deleted successfully" }))
    .catch((err) => res.status(400).json({ msg: "Failed to delete selected items", error: err }));
});




module.exports = router;