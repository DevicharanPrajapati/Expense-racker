import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContexts";

const BalanceContext = createContext();

export const BalanceDataProvider = ({ children }) => {
  const { token } = useAuth();

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get("/transaction/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(res.data.dashboard.balance);
        // setRecentTransactions(res.data.recentTransactions);
        console.log("Balance fetched:", res.data.dashboard.balance);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBalance();
    }
  }, [token]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        loading,
        // fetchBalance,
        // recentTransactions,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
