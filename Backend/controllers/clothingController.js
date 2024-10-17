const MCPants = require('../models/pantsModel');
const TMMensBlazers = require('../models/TMMensBlazerModel');
const RMMensBlazers = require('../models/RMMensBlazerModel');
const WCTshirt = require('../models/WCTShirtModel');
const TMWomensTrouser = require('../models/TMWomensTrouserModel');

exports.getClothingStats = async (req, res) => {
  try {
    const mcpants = await MCPants.find().select('name price sellerNo quantity itemNo'); // Added itemNo
    const tmmensblazers = await TMMensBlazers.find().select('name price sellerNo quantity itemNo'); // Added itemNo
    const rmmensblazers = await RMMensBlazers.find().select('name price sellerNo quantity itemNo'); // Added itemNo
    const wctshirts = await WCTshirt.find().select('name price sellerNo quantity itemNo'); // Added itemNo
    const tmwomenstrouser = await TMWomensTrouser.find().select('name price sellerNo quantity itemNo'); // Added itemNo
    
    const formattedData = [
      { category: 'Mens Casual Pants', items: mcpants },
      { category: 'Mens TM Blazers', items: tmmensblazers },
      { category: 'Mens RM Blazers', items: rmmensblazers },
      { category: 'Womens Casual TShirts', items: wctshirts },
      { category: 'Womens TM Trousers', items: tmwomenstrouser },
    ];

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clothing data' });
  }
};
