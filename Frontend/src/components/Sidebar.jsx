import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContexts";

const Sidebar = () => {
  const { user } = useAuth();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-lime-400 text-black shadow-md"
        : "text-gray-700 hover:bg-lime-100"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl flex flex-col">

      {/* User */}
     <div className="flex items-center gap-3 p-4 rounded-xl cursor-pointer border border-gray-200 hover:bg-lime-100 hover:shadow-md transition-all duration-300">
  {/* Avatar */}
  <div className="w-12 h-12 rounded-full bg-linear-to-r from-lime-500 to-green-500 flex items-center justify-center text-white">
    <h2 className="text-xl font-bold">
      {user?.name?.charAt(0).toUpperCase() || "U"}
    </h2>
  </div>

  {/* User Info */}
  <div className="overflow-hidden">
    <h3 className="font-semibold text-gray-800 truncate">
      {user?.name}
    </h3>
    <p className="text-sm text-gray-500 truncate">
      {user?.email}
    </p>
  </div>
</div>
    

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/dashboard" className={menuClass}>
          <MdDashboard size={22} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/income" className={menuClass}>
          <FaArrowAltCircleUp size={22} />
          <span>Income</span>
        </NavLink>

        <NavLink to="/expense" className={menuClass}>
          <FaArrowAltCircleDown size={22} />
          <span>Expense</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          onClick={() => {
            // Add logout logic here
            console.log("Logout");
          }}
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;