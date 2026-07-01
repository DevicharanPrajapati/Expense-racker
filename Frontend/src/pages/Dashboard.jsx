import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import IncomeCard from "../components/IncomeCard";
import ExpenseCard from "../components/ExpenseCard";
import SevingCard from "../components/SavingCard";
import FilterCard from "../components/FilterCard";
import { useFilterTransaction } from "../context/FilterTransactionContext";


const Dashboard = () => {
const { filterData } = useFilterTransaction();
const title = "Add Transaction"

if(filterData.length === 0){
  var errMessage = "No Transactions Found";
}
const filterTransactions = filterData.filter(
  (transaction) => transaction.type === "income" 
);
const filterAmountIncome = filterTransactions.reduce(
  (total, transaction) => total + transaction.amount,
  0,
);

const filterTransactionsExpense = filterData.filter(
  (transaction) => transaction.type === "expense"
);
const filterAmountExpense = filterTransactionsExpense.reduce(
  (total, transaction) => total + transaction.amount,
  0
);

  return (
    <div className="ms:min-h-screen bg-gray-100 p-6 rounded-2xl">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="text-gray-500 mb-8">Let's manage your pocket.</p>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BalanceCard />
        <IncomeCard  amount={filterAmountIncome} />
        <ExpenseCard amount={filterAmountExpense} />
        <SevingCard  amount={filterAmountIncome - filterAmountExpense}/>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left */}
        <div className="lg:col-span-2">
          <FilterCard/>
          <AddTransaction  heading={title}/>
          <div className="mt-4">
            
      </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-1">
          <TransactionList dataTransactions={filterData } errMessage={errMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
