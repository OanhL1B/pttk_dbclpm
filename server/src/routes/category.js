import express from "express";
import * as categoryController from "../controllers/category";
const {
  verifyToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/",
  [verifyToken, isAdminOrEmployee],
  categoryController.createCategory
);
router.get("/", categoryController.getCategories);

router.put(
  "/",
  [verifyToken, isAdminOrEmployee],
  categoryController.updateCategory
);
router.delete(
  "/",
  [verifyToken, isAdminOrEmployee],
  categoryController.deleteCategory
);
router.get("/:id", categoryController.getCategory);

export default router;
