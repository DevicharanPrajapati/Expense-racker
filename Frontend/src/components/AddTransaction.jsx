// import React from 'react'
import { FaArrowTrendUp, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AddTransaction = ({ heading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-10 pb-12">
      {/* Header */}
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <FaArrowTrendUp size={20} />
        <span>Financial Overview</span>
        <span className="text-gray-400 text-sm">(This Month)</span>
      </div>

      <div className="shadow-md p-6 mt-6 rounded-2xl shadow-olive-500 bg-emerald-50">
        {/* Title */}
        <div className="mt-3 p-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Finance Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Track your income, expenses, and manage your finances effortlessly.
          </p>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Link to={"/add-transaction"}>
            <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition">
              <FaPlus />
              {heading}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
