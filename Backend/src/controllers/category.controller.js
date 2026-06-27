const category = require("../models/category.model.js");
const User = require("../models/user.model.js");

const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }


    const addCategory = await category.create({
      userId: req.user.id,
      name,
      type,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category: addCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// getCategories();
// getCategoryById();
// updateCategory();
// deleteCategory();

module.exports = {
  createCategory,
};
