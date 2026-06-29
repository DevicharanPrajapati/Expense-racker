const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model.js");
const Category = require("../models/category.model.js");

const createTransaction = async (req, res) => {
  const { title, amount, type, description, paymentMethod, category } =
    req.body;

  try {
    if (!title || !amount || !type || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    console.log(category);

    const categoryExists = await Category.findOne({
      _id: category,
      userId: req.user.id,
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const addTransction = await Transaction.create({
      user: req.user.id,
      category,
      title,
      amount,
      type,
      description,
      paymentMethod,
    });

    return res.status(200).json({
      success: true,
      message: "transaction added successfully!",
      Transaction: addTransction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const showAllTransaction = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not found" });
    }
    const transactions = await Transaction.find({ user })
    .populate("category", "name");

    if (transactions.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Transactions are not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Transactions are fetched successfully!",
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const incomeTransactions = async (req, res) => {
  try {
    const user = req.user.id;
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
  
    const incomeData = await Transaction.find({
      user: user,
      type: "income",
    }).populate("category", "name");
  
    if(incomeData.length === 0){
      return res.status(500).json({success : false, message : "income Not found"});
    }
  
    const totalIncome = incomeData.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );
  
    return res
    .status(200)
    .json({success : true, 
      message : "income fetched successfully", 
      totalIncome,
      incomeTransactions : incomeData
    });
    
  } catch (error) {
    return res.status(500).json({success : false, message : error.message});
  }
};

const expenseTransactions = async (req, res) => {
  try {
    const user = req.user.id;
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
  
    const expenseData = await Transaction.find({
      user: user,
      type: "expense",
    }).populate("category", "name");
  
    if(expenseData.length === 0){
      return res.status(500).json({success : false, message : "expense data Not found"});
    }
  
    const totalExpense = expenseData.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );
  
    return res
    .status(200)
    .json({success : true, 
      message : "expense fetched successfully", 
      totalExpense,
      expenseTransactions : expenseData
    });
    
  } catch (error) {
    return res.status(500).json({success : false, message : error.message});
  }
};



module.exports = {
  createTransaction,
  showAllTransaction,
  incomeTransactions,
  expenseTransactions
};
