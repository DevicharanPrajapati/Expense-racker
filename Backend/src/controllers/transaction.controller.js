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
    console.log("Category Found:", categoryExists);

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

const getDashboard = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);

  try {
    // Total Income
    const incomeResult = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "income",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Total Expense
    const expenseResult = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;

    const totalExpense = expenseResult.length > 0 ? expenseResult[0].total : 0;

    const balance = totalIncome - totalExpense;

    // Recent Transactions
    const recentTransactions = await Transaction.find({
      user: userId,
    })
      .populate("category", "name")
      .sort({ createdAt: -1 }, { transactionDate: -1 })
      .limit(5);

    // Total Transactions
    const totalTransactions = await Transaction.countDocuments({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        balance,
        totalIncome,
        totalExpense,
        totalTransactions,
        recentTransactions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterTransaction = async (req, res) => {
  try {
    const { filter } = req.query;

    let startDate = new Date();
    let endDate = new Date();

    switch (filter) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;

      case "week":
        startDate.setDate(startDate.getDate() - startDate.getDay());
        startDate.setHours(0, 0, 0, 0);
        break;

      case "month":
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );
        break;

      case "year":
        startDate = new Date(startDate.getFullYear(), 0, 1);
        endDate = new Date(startDate.getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      case "all":
        startDate = null;
        endDate = null;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid filter",
        });
    }
  

    const query = {
      user: req.user.id,
    };

    if (filter !== "all") {
      query.transactionDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }


    const transactions = await Transaction.find(query).sort({
      transactionDate: -1,
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
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
      .populate("category", "name")
      .sort({ transactionDate: -1 });

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
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const incomeData = await Transaction.find({
      user: user,
      type: "income",
    })
      .populate("category", "name")
      .sort({ transactionDate: -1 });

    if (incomeData.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "income Not found" });
    }

    const totalIncome = incomeData.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    return res.status(200).json({
      success: true,
      message: "income fetched successfully",
      totalIncome,
      incomeTransactions: incomeData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const expenseTransactions = async (req, res) => {
  try {
    const user = req.user.id;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const expenseData = await Transaction.find({
      user: user,
      type: "expense",
    }).populate("category", "name");

    if (expenseData.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "expense data Not found" });
    }

    const totalExpense = expenseData.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    return res.status(200).json({
      success: true,
      message: "expense fetched successfully",
      totalExpense,
      expenseTransactions: expenseData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTransaction,
  showAllTransaction,
  incomeTransactions,
  expenseTransactions,
  getDashboard,
  filterTransaction,
};
