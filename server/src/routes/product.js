import express from "express";
import * as productController from "../controllers/product";
const {
  verifyToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/",
  [verifyToken, isAdminOrEmployee],
  productController.createProduct
);

router.get("/", productController.getProducts);

router.put(
  "/",
  [verifyToken, isAdminOrEmployee],
  productController.updateProduct
);
router.delete(
  "/",
  [verifyToken, isAdminOrEmployee],
  productController.deleteProduct
);
router.get("/:id", productController.getProduct);

module.exports = router;
export default router;
