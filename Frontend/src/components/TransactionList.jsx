// import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContexts";

const TransactionList = ({heading, dataTransactions}) => {

 return (

    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-5">Recent{heading}</h2>

      <div className="max-h-[300px] overflow-y-auto space-y-4 px-2">
        {dataTransactions.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-4  last:border-none"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  item.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {item.type === "income" ? (
                  <FaArrowDown className="text-green-600" />
                ) : (
                  <FaArrowUp className="text-red-600" />
                )}
              </div>

              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.category.name} •{" "}
                  {new Date(item.transactionDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <h3
              className={`font-bold ${
                item.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.type === "income" ? "+" : "-"}₹
              {item.amount.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
