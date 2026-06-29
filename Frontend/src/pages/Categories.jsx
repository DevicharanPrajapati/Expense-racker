import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContexts";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();
  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category/getCategory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    // Call API when component loads

    fetchCategories();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="text-gray-600">
                Type: <span className="font-medium">{category.type}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
