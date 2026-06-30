import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDashboard } from "../context/DashboardContext";

const BalanceCard = () => {
  const {dashboard} = useDashboard();
  console.log(dashboard)
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm font-medium">Total Balance</p>

        <div className="bg-green-100 p-2 rounded-full">
          <FaIndianRupeeSign className="text-green-600 text-lg" />
        </div>
      </div>

      {/* Balance */}
      <div className="flex items-center mt-6">
        <FaIndianRupeeSign className="text-3xl text-gray-800" />
        <span className="text-4xl font-bold text-green-400">
          {dashboard?.balance}
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
