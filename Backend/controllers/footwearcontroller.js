const SneakersModel = require('../models/sneakersModel');
const OfficeShoesModel = require('../models/OfficeshoesModel');
const BootsModel = require('../models/BootsModel');
const ChainsandBraceletsModel = require('../models/ChainsandBraceletsModel');

exports.getReport = async (req, res) => {
  try {
    const sneakers = await SneakersModel.find({});
    const officeShoes = await OfficeShoesModel.find({});
    const boots = await BootsModel.find({});
    const chainsAndBracelets = await ChainsandBraceletsModel.find({});
    
    // Combine data, including name
    const reportData = [
      ...sneakers.map(item => ({
        sellerNo: item.sellerNo, 
        itemNo: item.itemNo, 
        name: item.name,  // Added name here
        price: item.price, 
        quantity: item.quantity
      })),
      ...officeShoes.map(item => ({
        sellerNo: item.sellerNo, 
        itemNo: item.itemNo, 
        name: item.name,  // Added name here
        price: item.price, 
        quantity: item.quantity
      })),
      ...boots.map(item => ({
        sellerNo: item.sellerNo, 
        itemNo: item.itemNo, 
        name: item.name,  // Added name here
        price: item.price, 
        quantity: item.quantity
      })),
      ...chainsAndBracelets.map(item => ({
        sellerNo: item.sellerNo, 
        itemNo: item.itemNo, 
        name: item.name,  // Added name here
        price: item.price, 
        quantity: item.quantity
      }))
    ];

    console.log("Combined report data:", reportData);
    res.json(reportData);
  } catch (error) {
    console.error("Error fetching report data:", error);
    res.status(500).json({ message: "Error fetching report data", error });
  }
};
