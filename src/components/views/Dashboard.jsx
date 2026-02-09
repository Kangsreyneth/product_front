import React, { useEffect, useState } from "react";
import { productServices } from "../service/ProductService";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    totalQuantity: 0,
    avgPrice: 0,
  });
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await productServices.getAllproduct();
      setProducts(res);
      
      // Calculate statistics
      const totalProducts = res.length;
      const totalValue = res.reduce((sum, item) => sum + (item.prd_price * item.prd_qty), 0);
      const totalQuantity = res.reduce((sum, item) => sum + parseInt(item.prd_qty), 0);
      const avgPrice = totalProducts > 0 ? res.reduce((sum, item) => sum + parseFloat(item.prd_price), 0) / totalProducts : 0;
      
      setStats({
        totalProducts,
        totalValue,
        totalQuantity,
        avgPrice,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await productServices.deleteProduct(id);
    fetchProduct();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-sky-900 text-white flex flex-col fixed h-screen">
          <div className="p-6 border-b border-sky-800">
            <h1 className="text-2xl font-bold">🎽Product Dashboard</h1>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📊 Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📦 Products
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-sky-800">
            <p className="text-sm text-gray-300">© 2024 Product Manager</p>
          </div>
        </aside>
        <main className="flex-1 ml-64 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Loading...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-sky-900 text-white flex flex-col fixed h-screen">
          <div className="p-6 border-b border-sky-800">
            <h1 className="text-2xl font-bold">🎽Product Dashboard</h1>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📊 Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📦 Products
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-sky-800">
            <p className="text-sm text-gray-300">© 2024 Product Manager</p>
          </div>
        </aside>
        <main className="flex-1 ml-64 flex items-center justify-center">
          <p className="text-2xl text-red-500">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed/Sticky */}
      <aside className="w-64 bg-sky-900 text-white flex flex-col fixed h-screen">
        <div className="p-6 border-b border-sky-800">
          <h1 className="text-2xl font-bold">🎽Product Dashboard</h1>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${
                    isActive
                      ? "bg-sky-700"
                      : "hover:bg-sky-800"
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
                    isActive
                      ? "bg-sky-700"
                      : "hover:bg-sky-800"
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
                    isActive
                      ? "bg-sky-700"
                      : "hover:bg-sky-800"
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
                    isActive
                      ? "bg-sky-700"
                      : "hover:bg-sky-800"
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
                    isActive
                      ? "bg-sky-700"
                      : "hover:bg-sky-800"
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
                    isActive
                      ? "bg-sky-700"
                      : "hover:bg-sky-800"
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

      {/* Main Content - with margin for fixed sidebar */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome to your product management dashboard</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalProducts}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Value</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">${stats.totalValue.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Quantity</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalQuantity}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Avg Price</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">${stats.avgPrice.toFixed(2)}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <span className="text-2xl">💵</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Products Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Recent Products</h3>
              <NavLink
                to="/add-product"
                className="bg-green-700 hover:bg-green-800 text-white font-medium px-4 py-2 rounded shadow transition duration-200"
              >
                Add New
              </NavLink>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Image</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Qty</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((item) => (
                    <tr
                      key={item.prd_id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-600">{item.prd_id}</td>
                      <td className="py-3 px-4">
                        <img
                          src={item.prd_image}
                          alt={item.prd_name}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700">
                        {item.prd_name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.prd_qty}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">
                        ${item.prd_price}
                      </td>
                      <td className="py-3 px-4 flex justify-center gap-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm shadow transition duration-150"
                          onClick={() => navigate(`/edit/${item.prd_id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow transition duration-150"
                          onClick={() => handleDelete(item.prd_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {products.length > 5 && (
              <div className="mt-4 text-center">
                <NavLink
                  to="/products"
                  className="text-sky-900 hover:text-sky-700 font-medium"
                >
                  View All Products →
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;