import express from "express";
import * as cartController from "../controllers/cart";
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", [verifyToken], cartController.addToCart);

router.get("/:user_id", [verifyToken], cartController.getCartItems);

router.put("/", [verifyToken], cartController.updateCartItemQuantity);

router.delete("/:cartItemId", [verifyToken], cartController.removeFromCart);

export default router;
