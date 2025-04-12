import Bid from "../models/Bid.js";
import Product from "../models/Product.js";

export const placeBid = async (req, res) => {
  const { productId, userId, amount } = req.body;

  try {
    const existingBids = await Bid.countDocuments({ productId, userId });
    if (existingBids >= 2) {
      return res.status(400).json({
        success: false,
        message: "You can only place up to 2 bids for this product.",
      });
    }
    
    const bid = new Bid({ productId, userId, amount });
    await bid.save();
    res.status(201).json({ success: true, bid });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBidsForProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const bids = await Bid.find({ productId })
      .sort({ amount: -1 })
      .populate("userId", "name");
    res.status(200).json({ success: true, bids });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
