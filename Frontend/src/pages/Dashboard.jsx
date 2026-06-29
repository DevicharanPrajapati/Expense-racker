import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-2xl">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="text-gray-500 mb-8">
        Let's manage your pocket.
      </p>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BalanceCard />
        <BalanceCard />
        <BalanceCard />
        <BalanceCard />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-1">
          <AddTransaction />
        </div>

        {/* Right */}
        <div className="lg:col-span-2">
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;