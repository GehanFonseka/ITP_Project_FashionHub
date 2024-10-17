const Cart = require('../models/cart.mode.js') 
const CheckD = require ('../models/checkout.model.js') 
const Order =  require('../models/oder.mode.js') 
//add new items
const Itcreate = async (req, res, next) => {
  const { ItemsN, price, quantity, image, sellerNo} = req.body;

  const newItems = new Cart({
    ItemsN,
    price,
    quantity,
    image,
    sellerNo,
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};




// display in the cart
const getCartItem = async (req, res, next) => {
  try {
    const items = await Cart.find();

    if (items.length > 0) {
      res.json({ message: "Items details retrieved successfully", items });
    } else {
      res.status(404).json({ message: "Items not found" });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
  };

//romove 1 items in the cart
const deleteItems = async (req, res, next) => {
    try {
      await Cart.findByIdAndDelete(req.params.itemsId);
      res.status(200).json("The post has been deleted");
    } catch (error) {
      next(error);
    }
  };

  //clear cart
  

  const clearCart = async (req, res, next) => {
    try {
      // Log the incoming request for debugging
      console.log('Clear cart request received.');
  
      // Delete all items from the Cart collection
      const result = await Cart.deleteMany({});
      
      // Log the number of deleted items
      console.log(`Deleted ${result.deletedCount} items from the cart.`);
  
      res.status(200).json({ message: "All items have been deleted successfully" });
    } catch (error) {
      console.error("Error deleting items from cart:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  



  // clear checkout
const deleteItemss = async (req, res, next) => {
    try {
      // Delete all items from the Cart collection
      await CheckD.deleteMany({});
      
      res.status(200).json({ message: "All items have been deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

   //after click the check out those data save the chekd database
const CheckOutcrete = async (req, res, next) => {
  const {
    
    length,
    totalPrice,
    CurrentuserId,
    items,
  } = req.body;


  const newItems = new CheckD({
    
    length,
    totalPrice,
    CurrentuserId,
    items,
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

 
const getcheckdetails = async (req, res, next) => {
  try {
    const items = await CheckD.find();

    if (items.length > 0) {
      res.json({ message: "Items details retrieved successfully", items });
    } else {
      res.status(404).json({ message: "Items not found" });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

// Fetch the most recent order

const getLastOrder = async (req, res) => {
  try {
    const lastOrder = await CheckD.findOne().sort({ _id: -1 }); // Sort by _id to get the most recent entry

    if (lastOrder) {
      // Return the most recent order in the same structure as getcheckdetails
      res.status(200).json({
        message: "Last order details retrieved successfully",
        items: [lastOrder] // Wrapping lastOrder in an array to match the structure
      });
    } else {
      res.status(404).json({ message: "No recent order found" });
    }
  } catch (error) {
    console.error("Error fetching last order:", error.message);
    res.status(500).json({ error: "Unable to fetch the most recent order" });
  }
};


const getLastOrderL = async (req, res) => {
  try {
    const lastOrderL = await Order.findOne().sort({ _id: -1 }); // Sort by _id to get the most recent entry

    if (lastOrderL) {
      // Return the most recent order in the same structure as getcheckdetails
      res.status(200).json({
        message: "Last order details retrieved successfully",
        items: [lastOrderL
          
        ] // Wrapping lastOrder in an array to match the structure
      });
    } else {
      res.status(404).json({ message: "No recent order found" });
    }
  } catch (error) {
    console.error("Error fetching last order:", error.message);
    res.status(500).json({ error: "Unable to fetch the most recent order" });
  }
};







 //oder create
const ordercreated= async (req, res, next) => {
  const {
    
    email,
    delivery,
    Fname,
    Lname,
    Address,
    Apartment,
    City,
    Postal,
    items,
    totalPrice,
    Exdate,
    cvc,
    CardN,
    Phone,


  } = req.body;


  const newItems = new Order({
    
    email,
    delivery,
    Fname,
    Lname,
    Address,
    Apartment,
    City,
    Postal,
    items,
    totalPrice,
    Exdate,
    cvc,
    CardN,
    Phone
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};





//get all 
const getAlloder = async (req, res, next) => {
  try {
    const items = await Order.find();

    if (items.length > 0) {
      res.json({ message: "Items details retrieved successfully", items });
    } else {
      res.status(404).json({ message: "Items not found" });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




 //romove 1 items in the cart
const deleted = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.ItId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CheckOutcrete,
  getcheckdetails,
  ordercreated,
  getAlloder,
  deleted,
  deleteItemss,
  deleteItems,
  getCartItem,
  Itcreate,
  getLastOrder,
  getLastOrderL,
  clearCart
};

