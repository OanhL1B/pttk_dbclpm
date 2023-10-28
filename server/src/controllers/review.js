import db from "../models";
import { v4 } from "uuid";

export const addReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment, image } = req.body;

    const existingOrder = await db.Order.findOne({
      where: {
        user_id: user_id,

        order_status: "delivered",
      },
    });

    if (!existingOrder) {
      return res.status(400).json({
        success: false,
        message:
          "Bạn chỉ có thể đánh giá nếu như trạng thái là đã nhận được hàng",
      });
    }

    const review = await db.Review.create({
      id: v4(),
      product_id: product_id,
      user_id: user_id,
      rating: rating,
      comment: comment,
      image: image,
    });

    res.status(200).json({
      success: true,
      message: "Review added successfully!",
      retObj: review,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

export const getUserProductReviews = async (req, res) => {
  try {
    const { user_id, product_id } = req.params;

    const userProductReviews = await db.Review.findAll({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    res.status(200).json({
      success: true,
      retObj: userProductReviews,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

export const getAllProductReviews = async (req, res) => {
  try {
    const { product_id } = req.params;
    const existingProduct = await db.Product.findOne({
      where: {
        id: product_id,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const productReviews = await db.Review.findAll({
      where: {
        product_id: product_id,
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      reviews: productReviews,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

export const updateReview = async (req, res) => {
  try {
    const { review_id, rating, comment, image, reviewed } = req.body;
    const existingReview = await db.Review.findOne({
      where: {
        id: review_id,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    await existingReview.update({
      rating: rating,
      comment: comment,
      image: image,
      reviewed: reviewed,
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully!",
      review: existingReview,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

module.exports = {
  addReview,
  getUserProductReviews,
  updateReview,
  getAllProductReviews,
};
