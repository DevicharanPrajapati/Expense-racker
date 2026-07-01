import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import TransactionFrom from "./components/TransactionForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import CategoryForm from "./components/CategoryForm";
import NotFound from "./pages/NotFound";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Profile from "./pages/Profile";
import UpdateProfileForm from "./components/UpdateProfileForm";
import UpdatePasswordForm from "./components/UpdatePassForm";

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />
         <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-transaction"
          element={
            <ProtectedRoute>
              <TransactionFrom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addCategory"
          element={
            <ProtectedRoute>
              <CategoryForm />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute>
              <UpdateProfileForm />
            </ProtectedRoute>
          }
        />

         <Route
          path="/updatePassword"
          element={
            <ProtectedRoute>
              <UpdatePasswordForm />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
