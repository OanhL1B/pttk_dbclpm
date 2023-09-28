// import express from "express";
// // import * as authController from "../controllers/auth";

// const router = express.Router();

// router.post("/register", authController.register);
// router.post("/login", authController.login);

// export default router;

import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(200).json("Oanh");
});

export default router;
