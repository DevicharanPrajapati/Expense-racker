import { useState } from "react";
import { useAuth } from "../context/AuthContexts";
import { FaUser } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import { useProfileUpdate} from "../context/ProfileUpdateContext";

const UpdateProfileForm = () => {
  const { user } = useAuth();
  const { updateProfile } = useProfileUpdate();
  const navigate = useNavigate();
  

  const [name, setName] = useState(user?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // API Call Here
    updateProfile(name);
   alert("Profile updated successfully!");
   navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white text-green-600 flex items-center justify-center text-2xl">
            <FaUser />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <p className="text-green-100 text-sm">
              Update your display name
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link
            to="/profile"
            >
            <button
              type="button"
              className="flex-1 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            </Link>

          
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Save Changes
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;