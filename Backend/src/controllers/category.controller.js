const Category = require("../models/category.model.js");
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


    const addCategory = await Category.create({
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

const getCategories = async(req, res)=>{
try {
    const categories = await Category.find(
     { userId : req.user.id}
    ).select("-password");
  
    if(categories.length === 0){ //because find returns array
      return res.status(404)
      .json({success : false, message : "Categories are empty or not found!"})
    }
  
    return res
    .status(200)
    .json({
      success: true,
      message : "Categories Fetched successful",
      categories,
    })
} catch (error) {
  return res.status(500)
  .json({success :false, message : error.message})
}
};


const updateCategory = async(req, res)=>{

try {
   const {newName} = req.body;
   const categoryId = req.params.id;
   const updatedName = await Category.findByIdAndUpdate(
    categoryId,
    {
      name : newName
    },
    {
      new : true
    }
  );
  if (!updatedName) {
  return res.status(404).json({
    success: false,
    message: "Category not found.",
  });
}
  
  return res
  .status(201)
  .json({
    success : true,
    message : "Category updated successfully!",
    category: updatedName,
  })
} catch (error) {
  return res.status(500)
  .json({success :false, message : error.message})
}
};

const deleteCategory = async(req, res)=>{

  const categoryId = req.params.id;
  const deletedCategory = await Category.findByIdAndDelete(
    categoryId);

  return res
  .status(201)
  .json({success : true, 
    message : "Category deleted successfully!",
    Category : deletedCategory
  })
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
