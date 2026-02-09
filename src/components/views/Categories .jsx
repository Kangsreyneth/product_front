import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", count: 15, color: "blue" },
    { id: 2, name: "Clothing", count: 23, color: "purple" },
    { id: 3, name: "Food & Beverages", count: 18, color: "green" },
    { id: 4, name: "Home & Garden", count: 12, color: "yellow" },
    { id: 5, name: "Sports & Outdoors", count: 9, color: "red" },
    { id: 6, name: "Books & Media", count: 7, color: "indigo" },
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", color: "blue" });

  const colors = [
    { name: "Blue", value: "blue" },
    { name: "Purple", value: "purple" },
    { name: "Green", value: "green" },
    { name: "Yellow", value: "yellow" },
    { name: "Red", value: "red" },
    { name: "Indigo", value: "indigo" },
    { name: "Pink", value: "pink" },
    { name: "Orange", value: "orange" },
  ];

  const getColorClass = (color) => {
    const colorMap = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      indigo: "bg-indigo-500",
      pink: "bg-pink-500",
      orange: "bg-orange-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategory.name,
        count: 0,
        color: newCategory.color,
      };
      setCategories([...categories, newCat]);
      setNewCategory({ name: "", color: "blue" });
      setShowAddModal(false);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-900 text-white flex flex-col">
        <div className="p-6 border-b border-sky-800">
          <h1 className="text-2xl font-bold">🎽Product Dashboard</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                📊 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                📦 Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                📈 Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                🏷️ Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                ➕ Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                ⚙️ Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-sky-800">
          <p className="text-sm text-gray-300">© 2024 Product Manager</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Product Categories</h2>
              <p className="text-gray-600">Organize your products by categories</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded shadow transition duration-200"
            >
              Add Category
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${getColorClass(category.color)} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-2xl">🏷️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count} products</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-sky-900 hover:bg-sky-800 text-white px-4 py-2 rounded text-sm transition duration-200">
                    View Products
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition duration-200">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Category Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Categories</p>
                <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-green-600">
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Avg Products/Category</p>
                <p className="text-3xl font-bold text-purple-600">
                  {categories.length > 0 
                    ? Math.round(categories.reduce((sum, cat) => sum + cat.count, 0) / categories.length)
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Category Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                placeholder="Enter category name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Color</label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                    className={`h-12 rounded-lg ${getColorClass(color.value)} ${
                      newCategory.color === color.value ? 'ring-4 ring-gray-400' : ''
                    } transition-all`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;