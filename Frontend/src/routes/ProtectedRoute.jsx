import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContexts";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;