import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContexts";

const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-green-500 text-olive-800 py-6 flex flex-col items-center">

        <div className="h-24 w-24 rounded-full bg-white text-green-600 flex items-center justify-center text-4xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-4 text-2xl font-bold">
          {user?.name}
        </h2>

        <p className="text-olive-900">
          {user?.email}
        </p>

      </div>

      {/* Details */}
      <div className="p-6 space-y-5">

        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-medium">{user?.name}</p>
        </div>

        <hr />

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{user?.email}</p>
        </div>

        <hr />

        <div>
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="text-lg font-medium">
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-4 pt-6">

          <Link
            to="/updateProfile"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center font-semibold"
          >
            Edit Profile
          </Link>

          <Link
            to="/updatePassword"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl text-center font-semibold"
          >
            Change Password
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProfileCard;