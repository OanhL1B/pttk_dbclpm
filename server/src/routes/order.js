import express from "express";
import * as orderController from "../controllers/order";
const {
  verifyToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", [verifyToken], orderController.createOrder);
router.get("/", [verifyToken, isAdminOrEmployee], orderController.getOrders);

router.get("/user/:userId", verifyToken, orderController.getOrdersByUser);
router.get("/:orderId", orderController.getOrderById);
router.put(
  "/update",
  [verifyToken, isAdminOrEmployee],
  orderController.updateOrderStatus
);
router.delete("/:orderId", [verifyToken], orderController.cancelOrder);

export default router;
