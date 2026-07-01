import { useState } from "react";
import { Link } from "react-router-dom";

const UpdatePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API Call
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <p className="text-green-100 text-sm mt-1">
            Update your account password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Old Password
            </label>

            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter old password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <Link
            to="/profile">
            <button
              type="button"
              className="flex-1 border border-gray-300 rounded-xl py-3 font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            </Link>

            <Link
            to="/profile">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition"
              >
                Update Password
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
