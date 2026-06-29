// import React from 'react'
import { FaArrowTrendUp, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AddTransaction = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <FaArrowTrendUp size={20} />
        <span>Financial Overview</span>
        <span className="text-gray-400 text-sm">(This Month)</span>
      </div>

      {/* Title */}
      <div className="mt-3">
        <h1 className="text-4xl font-bold text-gray-800">
          Finance Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Track your income, expenses, and manage your finances effortlessly.
        </p>
      </div>

      {/* Button */}
      <div className="mt-6">
        <Link
        to={"/transition"}>
        <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition">
          <FaPlus />
          Add Transaction
        </button>
        </Link>
      </div>
    </div>
  );
};

export default AddTransaction;
