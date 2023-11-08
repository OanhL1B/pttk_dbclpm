import db from "../models";
import { v4 } from "uuid";
const { Op } = require("sequelize");

export const createProduct = async (req, res) => {
  const {
    productName,
    category_id,
    description,
    images,
    thumb,
    material,
    size,
    design,
    price,
    quantity,
  } = req.body;
  try {
    if (!productName && !category_id && !description) {
      return res.status(400).json({
        success: false,
        mes: "Missing inputs!",
      });
    }
    const existingProduct = await db.Product.findOne({
      where: { productName: productName },
    });

    if (existingProduct) {
      return res.status(400).json({
        productError: "Sản phẩm này đã tồn tại",
      });
    }

    const newProduct = await db.Product.create({
      id: v4(),
      productName: productName,
      category_id: category_id,
      description: description,
      images: images,
      thumb: thumb,
      material: material,
      size: size,
      design: design,
      price: price,
      quantity: quantity,
      product_status: 1,
    });

    return res.status(200).json({
      success: true,
      message: "Thêm mới sản phẩm thành công!",
      retObj: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const errors = { noProductError: String };
    const productId = req.params.id;

    const product = await db.Product.findOne({
      where: { id: productId },
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: ["id", "categoryName"],
        },
      ],
    });
    if (!product) {
      errors.noProductError = "Không tìm thấy sản phẩm";
      return res.status(404).json(errors);
    }

    res.status(200).json({ retObj: product });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      attributes: [
        "productName",
        "id",
        "description",
        "images",
        "thumb",
        "material",
        "size",
        "design",
        "product_status",
        "price",
        "quantity",
        "free_ship",
      ],
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: ["id", "categoryName"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Hiển thị tất cả sản phẩm thành công",
      retObj: products,
    });
  } catch (error) {
    console.error("Lỗi Backend", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server: " + error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const errors = { productError: String };
    const {
      productId,
      productName,
      category_id,
      description,
      images,
      thumb,
      material,
      size,
      design,
      price,
      quantity,
      product_status,
      free_ship,
    } = req.body;

    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(400).json({ productError: "Sản phẩm không tồn tại" });
    }

    const existingCategory = await db.Category.findByPk(category_id);
    if (!existingCategory) {
      return res.status(400).json({ productError: "Danh mục không tồn tại" });
    }

    await product.update({
      productName: productName,
      category_id: category_id,
      description: description,
      images: images,
      thumb: thumb,
      material: material,
      size: size,
      design: design,
      price: price,
      quantity: quantity,
      product_status: product_status,
      free_ship: free_ship,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message;
    res.status(500).json(errors);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const errors = { productError: String };

    for (let i = 0; i < req.body?.length; i++) {
      const productId = req.body[i];

      const productInCart = await db.Cart.findOne({
        where: { product_id: productId },
      });

      const productInOrder = await db.Order.findOne({
        where: {
          order_status: { [Op.in]: ["pending", "shipped", "delivered"] },
        },
        include: [
          {
            model: db.Product_item,
            as: "product",
            where: { product_id: productId },
          },
        ],
      });

      if (productInCart || productInOrder) {
        return res.status(400).json({
          productError:
            "Không thể xóa sản phẩm đã có trong giỏ hàng hoặc đơn hàng",
        });
      }

      await db.Product.destroy({ where: { id: productId } });
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error("error", error);
    const errors = { backendError: String };
    errors.backendError = error.message || "Internal Server Error";
    res.status(500).json(errors);
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId, freeship, minPrice, maxPrice, reset } = req.query;
    let whereCondition = {};

    if (categoryId) {
      whereCondition.category_id = categoryId;
    }

    if (reset === "true") {
      const allProducts = await db.Product.findAll({
        where: whereCondition,
        attributes: [
          "productName",
          "id",
          "description",
          "images",
          "thumb",
          "material",
          "size",
          "design",
          "product_status",
          "price",
          "quantity",
          "free_ship",
        ],
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: ["id", "categoryName"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "Hiển thị tất cả sản phẩm thành công",
        retObj: allProducts,
      });
    } else {
      if (freeship === "true") {
        whereCondition.free_ship = true;
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        whereCondition.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      }

      const products = await db.Product.findAll({
        where: whereCondition,
        attributes: [
          "productName",
          "id",
          "description",
          "images",
          "thumb",
          "material",
          "size",
          "design",
          "product_status",
          "price",
          "quantity",
          "free_ship",
        ],
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: ["id", "categoryName"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "Hiển thị sản phẩm theo điều kiện lọc thành công",
        retObj: products,
      });
    }
  } catch (error) {
    console.error("Lỗi Backend", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server: " + error.message,
    });
  }
};
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
