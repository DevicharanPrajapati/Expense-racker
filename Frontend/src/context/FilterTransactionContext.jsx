import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContexts";

const FilterTransactionContext = createContext();

export const FilterTransactionProvider = ({ children }) => {
  const { token } = useAuth();

  const [filter, setFilter] = useState("all");
  const [filterData, setFilterData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const getFilteredTransactions = async (selectedFilter) => {
      if (!token) return;

      try {
        const { data } = await api.get(
          `/transaction/filter?filter=${selectedFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLoading(false);

        setFilter(selectedFilter);
        setFilterData(data.transactions);
        setMessage(data.message);
        // console.log("Filtered Transactions:", data.transactions);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setMessage(
          error.response?.data?.message || "Error fetching transactions",
        );
      }
    };

    getFilteredTransactions(filter);
  }, [filter, token]);

  return (
    <FilterTransactionContext.Provider
      value={{
        filter,
        filterData,
        message,
        loading,
        // getFilteredTransactions,
      }}
    >
      {children}
    </FilterTransactionContext.Provider>
  );
};

export const useFilterTransaction = () => {
  return useContext(FilterTransactionContext);
};
