import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("Profile Response:", response.data);
        setUser(response.data.profile);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, [token]);

  const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
