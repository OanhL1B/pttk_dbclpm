import express from "express";
import * as authController from "../controllers/auth";
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/current", verifyToken, authController.getCurrent);
router.get("/forgotpassword", authController.forgotPassword);
router.put("/resetpassword", authController.resetPassword);
router.put("/changepassword", [verifyToken], authController.changePassword);

// cứ liên quan tới user thì nhân viên k có quyền vậy đi
router.get("/", [verifyToken, isAdmin], authController.getUsers); // getall
router.delete("/", [verifyToken, isAdmin], authController.deleteUser);
router.put("/current", [verifyToken], authController.updateUser);
router.put("/", [verifyToken, isAdmin], authController.updateUserByAdmin);

export default router;
