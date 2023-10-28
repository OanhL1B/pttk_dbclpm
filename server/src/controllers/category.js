import db from "../models";
import { v4 } from "uuid";
export const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const existingCategory = await db.Category.findOne({
      where: { categoryName: categoryName },
    });

    if (existingCategory) {
      return res.status(400).json({
        categoryError: "Danh mục này đã tồn tại",
      });
    }

    const newCategory = await db.Category.create({
      id: v4(),
      categoryName: categoryName,
    });

    return res.status(200).json({
      success: true,
      message: "Thêm mới danh mục thành công!",
      retObj: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const errors = { noCategoryError: String };
    const categoryId = req.params.id;

    const category = await db.Category.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      errors.noCategoryError = "Không tìm thấy danh mục";
      return res.status(404).json(errors);
    }

    res.status(200).json({ retObj: category });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      attributes: ["categoryName", "id"],
    });

    res.status(200).json({
      success: true,
      message: "Hiển thị tất cả danh mục thành công",
      retObj: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server: " + error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const errors = { categoryError: String };
    const { categoryId, categoryName } = req.body;

    const category = await db?.Category?.findByPk(categoryId);

    if (!category) {
      return res.status(400).json({ categoryError: "Danh mục không tồn tại" });
    }

    const existingCategory = await db.Category.findOne({
      where: {
        categoryName: categoryName,
        id: { [db.Sequelize.Op.ne]: categoryId },
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        categoryError:
          "Tên danh mục này đã tồn tại, vui lòng chọn một tên khác!",
      });
    }

    await category.update({ categoryName: categoryName });

    res.status(200).json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message;
    res.status(500).json(errors);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const categories = req.body;
    const errors = { categoryError: String };

    for (let i = 0; i < categories.length; i++) {
      const categoryId = categories[i];

      const productsInCategory = await db.Product.findAll({
        where: { category_id: categoryId },
      });

      if (productsInCategory.length > 0) {
        return res.status(400).json({
          categoryError: "Không thể xóa danh mục có chứa sản phẩm",
        });
      }

      await db.Category.destroy({ where: { id: categoryId } });
    }

    res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error.message || error;
    res.status(500).json(errors);
  }
};

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
