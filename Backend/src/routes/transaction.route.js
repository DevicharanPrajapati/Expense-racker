const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const {
  createTransaction,
  getBalance,
  filterTransaction
} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/addTransaction", verifyToken, createTransaction);
router.get("/balance", verifyToken, getBalance);
router.get("/filter", verifyToken, filterTransaction);




module.exports = router;
