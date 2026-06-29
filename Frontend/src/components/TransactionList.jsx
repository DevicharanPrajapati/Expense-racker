import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const transactions = [
  {
    id: 1,
    title: "Salary",
    category: "Income",
    amount: 50000,
    type: "income",
    date: "29 Jun 2026",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    amount: 1200,
    type: "expense",
    date: "28 Jun 2026",
  },
  {
    id: 3,
    title: "Electric Bill",
    category: "Bills",
    amount: 2500,
    type: "expense",
    date: "27 Jun 2026",
  },
];

const TransactionList = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">Recent Transactions</h2>

      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4 last:border-none"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  item.type === "income"
                    ? "bg-green-100"
                    : "bg-red-100"
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
                  {item.category} • {item.date}
                </p>
              </div>
            </div>

            <h3
              className={`font-bold ${
                item.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
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