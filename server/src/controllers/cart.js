import db from "../models";
import { v4 } from "uuid";

export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity, price } = req.body;

    const existingCartItem = await db.Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    if (existingCartItem) {
      await existingCartItem.update({
        quantity: existingCartItem.quantity + quantity,
        price: price,
      });
    } else {
      await db.Cart.create({
        id: v4(),
        user_id: user_id,
        product_id: product_id,
        quantity: quantity,
        price: price,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product added to the cart successfully!",
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;

    const cartItems = await db.Cart.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: db.Product,
          as: "product",
          attributes: ["id", "thumb", "productName", "price"],
        },
      ],
    });

    res.status(200).json({ success: true, retObj: cartItems });
  } catch (error) {
    const errors = { backendError: error.toString() };
    res.status(500).json(errors);
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    const cartItem = await db.Cart.findOne({ where: { id: cartItemId } });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully",
      retObj: cartItem,
    });
  } catch (error) {
    const errors = { backendError: error.toString() };
    res.status(500).json(errors);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await db.Cart.findOne({ where: { id: cartItemId } });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.destroy();

    res.status(200).json({
      success: true,
      message: "Product removed from the cart successfully",
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ backendError: "An error occurred on the backend" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
};
