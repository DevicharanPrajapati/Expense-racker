const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const {
  createTransaction,
  showAllTransaction,
  incomeTransactions,
  expenseTransactions
} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/addTransaction", verifyToken, createTransaction);
router.get("/showTransaction", verifyToken, showAllTransaction);
router.get("/incomeTransaction", verifyToken, incomeTransactions);
router.get("/expenseTransaction", verifyToken, expenseTransactions);


module.exports = router;
