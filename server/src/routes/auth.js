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

export default router;
