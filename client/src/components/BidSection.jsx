import { useEffect, useState } from "react";
import axios from "axios";

const BidSection = ({ productId, userId }) => {
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [userBidCount, setUserBidCount] = useState(0);
  const [message, setMessage] = useState("");

  const fetchBids = async () => {
    try {
      const res = await axios.get(`/api/bids/product/${productId}`);
      setBids(res.data.bids || []);
      
      // Count how many times this user has bid
      const userBids = res.data.bids.filter(bid => bid.userId === userId);
      setUserBidCount(userBids.length);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }
  };

  const placeBid = async () => {
    if (userBidCount >= 2) {
      setMessage("❌ You can only bid twice on this product.");
      return;
    }

    try {
      await axios.post("/api/bids/place", {
        productId,
        userId,
        amount: parseFloat(amount),
      });
      setAmount("");
      setMessage("✅ Bid placed successfully!");
      fetchBids();
    } catch (err) {
      console.error("Failed to place bid:", err);
      setMessage("❌ Failed to place bid.");
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Place a Bid</h3>

    <div className="flex items-center gap-4 text-base">

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter bid amount"
        className="w-full py-3.5 px-4 rounded border border-gray-300 text-gray-800/80 placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-gray-200 transition"
      />
      <button onClick={placeBid} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition">Bid</button>

      {/* <h4>Top Bids:</h4>
      <ul>
        {bids.map((bid) => (
          <li key={bid._id}>{bid.userId?.name || "Anonymous"}: ₹{bid.amount}</li>
        ))}
      </ul> */}
      </div>
      {message && <p className="text-sm mt-2 text-red-600">{message}</p>}
      {bids.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-2">Top Bids:</h4>
          <ul className="space-y-1 text-gray-600 text-sm">
            {bids
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 5)
              .map((bid) => (
                <li key={bid._id}>
                  ₹{bid.amount} - {bid.userName || "User"}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BidSection;
