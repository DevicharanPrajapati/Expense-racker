// import React from 'react'
import TransactionList from "../components/TransactionList";
import ExpenseCard from "../components/ExpenseCard";
import AddTransaction from "../components/AddTransaction";
import FilterCard from "../components/FilterCard";
import { useFilterTransaction } from "../context/FilterTransactionContext";

const Expense = () => {
  const title = "Add Expense";
  const titleTran = " Expenses";

  const { filterData } = useFilterTransaction();

  const expenseTransactions = filterData.filter(
    (transaction) => transaction.type === "expense",
  );

  const filterAmount = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  if (expenseTransactions.length === 0) {
    var errMessage = "No Transactions Found";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Expense</h2>
      <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
        Let's manage your Expenses.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseCard amount={filterAmount} />
          <FilterCard />

          <AddTransaction heading={title} />

          <div className="lg:col-span-1">
            <TransactionList
              heading={titleTran}
              dataTransactions={expenseTransactions}
              errMessage={errMessage}
            />
          </div>
        </div>
      </div>
  
  );
};

export default Expense;
