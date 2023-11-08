import db from "../models";
const { v4: uuidv4 } = require("uuid");

export const createOrder = async (req, res) => {
  try {
    const { userId, productItems, shippingAddress, total_price } = req.body;

    const newOrder = await db.Order.create({
      id: uuidv4(),
      user_id: userId,
      order_status: "pending",
      shipping_address: shippingAddress,
      phone_Number: "0961319366",
      total_price: total_price,
    });

    await db.Product_item.bulkCreate(
      productItems.map((item) => ({
        order_id: newOrder?.id,
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
    res.status(500).json(error);
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
          as: "product",
          include: [
            {
              model: db.Product,
              as: "product",
              attributes: ["id", "productName", "thumb"],
            },
          ],
        },
      ],
    });

    const productItems = await db.Product_item.findAll({});

    res
      .status(200)
      .json({ success: true, retObj: userOrders, productItems: productItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ backendError: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await db.Order.findByPk(orderId, {
      include: [
        {
          model: db.Product_item,
          as: "product",
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

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ success: true, retObj: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ backendError: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, Order_ReviewerId } = req.body;

    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.update({
      order_status: status,
      Order_ReviewerId: Order_ReviewerId,
    });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      retObj: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ backendError: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "order_status",
        "total_price",
      ],
      order: [["createdAt", "DESC"]],
      // include: [
      //   {
      //     model: db.User,
      //     as: "user",
      //     attributes: ["id", "firstName", "lastName"],
      //   },
      // ],
      include: [
        {
          model: db.Product_item,
          as: "product",
          include: [
            {
              model: db.Product,
              as: "product",
              attributes: ["id", "productName", "thumb"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Show all orders successfully",
      retObj: orders,
    });
  } catch (error) {
    console.error("Backend Error", error);
    res.status(500).json({ backendError: "Internal Server Error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await db.Order.findOne({ where: { id: orderId } });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (order.order_status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Cannot cancel the order. Only orders in 'pending' status can be canceled.",
      });
    }

    const orderItems = await db.Product_item.findAll({
      where: { order_id: orderId },
    });
    for (const item of orderItems) {
      await db.Product.increment("quantity", {
        by: item.quantity,
        where: { id: item.product_id },
      });
    }

    await db.Order.update(
      { order_status: "canceled" },
      { where: { id: orderId } }
    );

    res
      .status(200)
      .json({ success: true, message: "Order canceled successfully!" });
  } catch (error) {
    console.error("Error while canceling order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while canceling the order.",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  getOrders,
  cancelOrder,
};
