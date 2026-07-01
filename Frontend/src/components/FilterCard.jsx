import { FaArrowTrendUp } from "react-icons/fa6";
import { useFilterTransaction } from "../context/FilterTransactionContext";

//style code

const FilterCard = () => {
  const { filter, getFilteredTransactions } = useFilterTransaction();

  // console.log("Current Filter:", filter);

  const styleBtn = (value) =>
    `p-2 px-6 rounded-md transition-colors border-1 ${
      filter === value
        ? "bg-green-600 text-white"
        : "bg-emerald-300 text-black hover:bg-emerald-200"
    }`;

  return (
    <div className="bg-emerald-100 p-4  rounded-xl shadow-md mb-4">
        <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold mb-4 text-olive-800">
          <FaArrowTrendUp color="green" />
          Filter Your Transactions
        </h2>

        <div className="flex flex-wrap justify-center sm:justify-between gap-2">
          <button
            className={styleBtn("today")}
            onClick={() => getFilteredTransactions("today")}
          >
            Today
          </button>

          <button
            className={styleBtn("week")}
            onClick={() => getFilteredTransactions("week")}
          >
            Week
          </button>

          <button
            className={styleBtn("month")}
            onClick={() => getFilteredTransactions("month")}
          >
            Month
          </button>

          <button
            className={styleBtn("year")}
            onClick={() => getFilteredTransactions("year")}
          >
            Year
          </button>

          <button
            className={styleBtn("all")}
            onClick={() => getFilteredTransactions("all")}
          >
            All
          </button>
        </div>
      </div>
  );
};

export default FilterCard;
