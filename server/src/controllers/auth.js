import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
const crypto = require("crypto");
const sendMail = require("../ultils/sendMail");

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
      { id: newUser.id, role: newUser.role },
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
        msg: "Missing inputs",
      });
    }

    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    // Log successful logins
    console.log(`User ${user.email} logged in successfully.`);

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
        role: user.role,

        isBlock: user.isBlock,
      },
    });
  } catch (error) {
    // Log errors for further investigation
    console.error("Error occurred during login:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await db.User.findOne({
      where: { id },
      raw: true,
      attributes: {
        exclude: ["password"],
      },
    });

    if (user) {
      return res.status(200).json({
        success: user ? true : false,
        retObj: user ? user : "User not found",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
        retObj: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed at category controller: " + error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      throw new Error("Missing email");
    }

    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Email này chưa được được ký tài khoản!");
    }

    const resetToken = user.createPasswordChangedToken(); // Assuming you have a method in your Sequelize model to generate reset token
    await user.save();

    const resetLink = `http://localhost:3000/forgot-password/api/user/reset-password/${resetToken}`;

    const emailHtml = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 10 phút kể từ bây giờ. <a href='${resetLink}'>Click here</a>`;

    const emailData = {
      email,
      html: emailHtml,
    };

    const emailResponse = await sendMail(emailData);

    return res.status(200).json({
      success: true,
      response: emailResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    if (!password || !token) {
      throw new Error("Missing inputs");
    }

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await db.User.findOne({
      where: {
        passwordResetToken: passwordResetToken,
        passwordResetExpires: { [db.Sequelize.Op.gt]: Date.now() },
      },
    });

    if (!user) {
      throw new Error("Invalid reset token or token expired");
    }

    // Hash the new password before updating
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and reset token fields
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordChangedAt = new Date().toISOString();
    user.passwordResetExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }

  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không có user này trong hệ thống",
      });
    }

    const isCorrectPassword = await user.isCorrectPassword(currentPassword);
    console.log(isCorrectPassword);

    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Mật khẩu hiện tại chưa đúng",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    user.passwordChangedAt = new Date().toISOString();
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server: " + error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const response = await db.User.findAll({
      attributes: {
        exclude: ["refreshToken", "password"],
      },
    });

    return res.status(200).json({
      success: response ? true : false,
      retObj: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server: " + error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }

  try {
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: `User with email ${user.email} deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, email, phone, address, image } = req.body;

  try {
    if (!id) {
      throw new Error("Missing user ID");
    }

    const updatedUser = await db.User.findByPk(id);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    updatedUser.firstName = firstName || updatedUser.firstName;
    updatedUser.lastName = lastName || updatedUser.lastName;
    updatedUser.email = email || updatedUser.email;
    updatedUser.phone = phone || updatedUser.phone;
    updatedUser.address = address || updatedUser.address;
    updatedUser.image = image || updatedUser.image;

    await updatedUser.save();

    return res.status(200).json({
      success: true,
      updatedUser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export const updateUserByAdmin = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    email,
    phone,
    address,
    image,
    isBlock,
    role,
  } = req.body;

  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    if (Object.keys(req.body).length === 1) {
      throw new Error("Missing inputs");
    }

    const user = await db.User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }
    if (image) {
      user.image = image;
    }
    if (role) {
      user.role = role;
    }
    if (isBlock) {
      user.isBlock = isBlock;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      updatedUser: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
