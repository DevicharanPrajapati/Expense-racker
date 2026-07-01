import { createContext, useContext } from "react";
import { useAuth } from "./AuthContexts";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ProfileUpdateContext = createContext();

const ProfileUpdateProvider = ({ children }) => {
  const { token, setUser } = useAuth();
  const navigate = useNavigate();

  const updateProfile = async (name) => {
    try {
      //profile update api call
      const response = await api.put(
        "/users/updateProfile",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data.user);
      alert(response.data.message);
      navigate("/profile");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //password update api call
  const updatePassword = async (formdata) => {
    try {
      const response = await api.put(
        "/users/updatePassword",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log("Password update response:", response.data);
      alert(response.data.message);
      navigate("/profile");
      return response.data.message;
    } catch (error) {
      console.error(error.message);
      // console.log(error.response?.data);
      // console.log(error.response?.status);
    }
  };

  return (
    <ProfileUpdateContext.Provider value={{ updateProfile, updatePassword }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};

export { ProfileUpdateProvider };

export const useProfileUpdate = () => useContext(ProfileUpdateContext);
