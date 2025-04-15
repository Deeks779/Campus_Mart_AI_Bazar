import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Bids = () => {
  const [bids, setBids] = useState([]);

  const fetchBids = async () => {
    try {
      const res = await axios.get("/api/bids/seller");
      setBids(res.data.bids);
      // console.log(bids);
      
    } catch (err) {
    //   toast.error("Failed to load bids");
    console.error(err.response?.data || err.message);
    toast.error("Failed to load bids363e456");
    }
  };

  const handleDecision = async (bidId, action) => {
    try {
      await axios.post(`/api/bids/${action}`, { bidId });
      toast.success(`Bid ${action}ed`);
      fetchBids();
    } catch (err) {
      toast.error(`Failed to ${action} bid`);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Incoming Bids</h2>
      {bids.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid._id} className="border p-4 rounded shadow flex justify-between items-center bg-white">
              <div>
                <p><strong>Product:</strong> {bid.productId?._id}</p>
                <p><strong>Bidder:</strong> {bid.userId?.name}</p>
                <p><strong>Amount:</strong> ₹{bid.amount}</p>
                <p><strong>Status:</strong> {bid.status}</p>
              </div>
              {bid.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDecision(bid._id, "accept")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(bid._id, "reject")}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bids;
