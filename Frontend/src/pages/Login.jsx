import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import api from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}
const navigate = useNavigate();

async function handleSubmit(e) {
  e.preventDefault();

  // Send data to backend
   try {
    const response = await api.post("/users/login", formData);

    console.log(response.data);

    alert("Login Successful!");
    navigate("/dashboard");
  } catch (error) {
    console.log(error.response?.data);

    alert(error.response?.data?.message || "Something went wrong");
  }
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to manage your expenses.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* <div>
            <label className="block mb-2 font-medium">Full Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div> */}

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}

              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* <div>
            <label className="block mb-2 font-medium">Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link
            to="/register"
            className="text-green-600 font-medium ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login