import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-8xl font-extrabold text-red-500">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-lime-600 transition duration-300 shadow-md"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;