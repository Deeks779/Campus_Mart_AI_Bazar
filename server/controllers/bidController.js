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

export const getBidsForSeller = async (req, res) => {
  try {
    const bids = await Bid.find()
      .populate("productId", "title thumbnail")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bids });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Accept a Bid
export const acceptBid = async (req, res) => {
  const { bidId } = req.body;

  try {
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ success: false, message: "Bid not found" });

    bid.status = "accepted";
    await bid.save();

    res.status(200).json({ success: true, message: "Bid accepted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Reject a Bid
export const rejectBid = async (req, res) => {
  const { bidId } = req.body;

  try {
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ success: false, message: "Bid not found" });

    bid.status = "rejected";
    await bid.save();

    res.status(200).json({ success: true, message: "Bid rejected" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const getBidsByUser = async (req, res) => {
  try {
    const userId = req.user._id
    const bids = await Bid.find({ userId })
      .populate("productId", "title thumbnail offerPrice")
      .sort({ createdAt: -1 })

    res.status(200).json({ success: true, bids })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
