import TransactionList from "../components/TransactionList";
import IncomeCard from "../components/IncomeCard";
import AddTransaction from "../components/AddTransaction";
import FilterCard from "../components/FilterCard";
import { useFilterTransaction } from "../context/FilterTransactionContext";

export const Income = () => {
  const title = "Add Income";
  const titleInc = " Income";

  const { filterData } = useFilterTransaction();

  const incomeTransactions = filterData.filter(
    (transaction) => transaction.type === "income",
  );

 
  const filterAmount = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

   if (incomeTransactions.length === 0) {
    var errMessage = "No Transactions Found";
  }

 

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800">Income</h2>
      <p className="text-gray-500 mb-8">Let's manage your Income.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeCard amount={filterAmount} />
        <FilterCard />
        <AddTransaction heading={title} />

        <div className="lg:col-span-1">
          <TransactionList
            heading={titleInc}
            dataTransactions={incomeTransactions}
            errMessage={errMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Income;
