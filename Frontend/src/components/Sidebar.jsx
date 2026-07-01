import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContexts";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-lime-400 text-black shadow-md"
        : "text-gray-700 hover:bg-lime-100"
    }`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          w-64 h-screen
          flex flex-col
          bg-white
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center gap-3 p-4 mt-6  rounded-xl cursor-pointer border border-gray-200 hover:bg-lime-100 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
            <h2 className="text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </h2>
          </div>

          <div className="overflow-hidden">
            <h3 className="font-semibold text-gray-800 truncate">
              {user?.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <MdDashboard size={22} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/income"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaArrowAltCircleUp size={22} />
            <span>Income</span>
          </NavLink>

          <NavLink
            to="/expense"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaArrowAltCircleDown size={22} />
            <span>Expense</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaUser size={22} />
            <span>Profile</span>
          </NavLink>
        </nav>
        <div className="p-4 border-t">
          <button
            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
            onClick={handleLogout}
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Logout */}
      </aside>
    </>
  );
};

export default Sidebar;
