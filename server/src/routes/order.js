import express from "express";
import * as orderController from "../controllers/order";
const {
  verifyToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", [verifyToken], orderController.createOrder);
// router.get("/", [verifyToken, isAdminOrEmployee], orderController.getOrders);
// router.get("/income", [verifyToken, isAdminOrEmployee], orderController.Income);

router.get("/user/:userId", verifyToken, orderController.getOrdersByUser);
// router.get("/:orderId", orderController.getOrderById);
// router.put(
//   "/",
//   [verifyToken, isAdminOrEmployee],
//   orderController.updateOrderStatus
// );
// router.delete("/:orderId", [verifyToken], orderController.cancelOrder);

export default router;
