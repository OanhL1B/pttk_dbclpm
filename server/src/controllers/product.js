import db from "../models";
import { v4 } from "uuid";

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
    // product_status,
  } = req.body;
  console.log(" req.body", req.body);
  try {
    if (!productName && !category_id && !description) {
      console.log(productName, category_id, description);
      console.log("vô đây");
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
    console.log("productId", productId);

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
    } = req.body;

    if (!productId) {
      errors.productError = "Thiếu thông tin productId";
      return res.status(400).json(errors);
    }

    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(400).json({ productError: "Sản phẩm không tồn tại" });
    }

    const existingCategory = await db.Category.findByPk(category_id);
    if (!existingCategory) {
      return res.status(400).json({ productError: "Danh mục không tồn tại" });
    }

    // Cập nhật thông tin sản phẩm
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

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  // deleteCategory,
};
