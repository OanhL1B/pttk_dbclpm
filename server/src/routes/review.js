import express from "express";
import * as reviewController from "../controllers/review";
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", [verifyToken], reviewController.addReview);

router.get(
  "/user_product/:user_id/:product_id",
  [verifyToken],
  reviewController.getUserProductReviews
);

router.get(
  "/allproduct_review/:product_id",
  reviewController.getAllProductReviews
);

router.put("/", [verifyToken], reviewController.updateReview);

export default router;
