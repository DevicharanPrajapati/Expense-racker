const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      lowercase : true
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "credit_card", "debit_card", "bank_transfer", "other"],
      default: "cash",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);