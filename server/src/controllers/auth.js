import * as authService from "../services/auth";
import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

export const register = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  try {
    if (!firstName || !lastName || !password || !email) {
      return res.status(400).json({
        success: false,
        mes: "Missing inputs!",
      });
    }

    const existingUser = await db.User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User has been already used!",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await db.User.create({
      id: v4(),
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    return res.status(200).json({
      success: true,
      message: "Register is successful. Please go login~",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Fail at auth controller: " + error,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mes: "Missing inputs",
      });
    }

    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

      return res.status(200).json({
        success: true,
        accessToken,
        userData: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          image: user.image,
          isBlock: user.isBlock,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "Email or password is incorrect!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
