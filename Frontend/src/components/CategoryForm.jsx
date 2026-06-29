import { useState } from "react";

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // TODO: Call your API here
    // await api.post("/category/createCategory", formData);

    setFormData({
      name: "",
      type: "expense",
    });
  };

  return (
    <div className="category-form">
      <h2>Add Category</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Category Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;