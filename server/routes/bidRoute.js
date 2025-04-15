import express from "express";
import { placeBid, getBidsForProduct, getBidsForSeller, acceptBid, rejectBid, getBidsByUser } from "../controllers/bidController.js";
// import  authUser  from "../middlewares/authSeller.js";
import authSeller from "../middlewares/authSeller.js";
import authUser from '../middlewares/authUser.js'


const router = express.Router();

router.post("/place", placeBid);
router.get("/product/:productId", getBidsForProduct);

// New routes for seller
router.get("/seller", authSeller, getBidsForSeller);
router.post("/accept", authSeller, acceptBid);
router.post("/reject", authSeller, rejectBid);
router.get("/user", authUser, getBidsByUser);

export default router;
