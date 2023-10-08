import db from "../models";
import { v4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    const { userId, productItems, shippingAddress, total_price, phone_Number } =
      req.body;

    const newOrder = await db.Order.create({
      id: v4(),
      user_id: userId,
      order_status: "Pending",
      shipping_address: shippingAddress,
      phone_Number: phone_Number,
      total_price: total_price,
    });

    await db.Product_item.bulkCreate(
      productItems.map((item) => ({
        id: v4(),
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }))
    );

    await db.Cart.destroy({
      where: {
        user_id: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      retObj: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ backendError: "Internal Server Error" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userOrders = await db.Order.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Product_item,
          as: "items",
          include: [
            {
              model: db.Product,
              as: "product",
              attributes: ["productName", "thumb"],
            },
          ],
        },
      ],
    });

    res.status(200).json({ success: true, retObj: userOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ backendError: "Internal Server Error" });
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
  createOrder,
  getOrdersByUser,
  updateCartItemQuantity,
  removeFromCart,
};
