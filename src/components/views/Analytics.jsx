import React, { useEffect, useState } from "react";
import { productServices } from "../service/ProductService";
import { NavLink } from "react-router-dom";

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalValue: 0,
    totalQuantity: 0,
    avgPrice: 0,
    lowStock: 0,
    highValue: 0,
    mostExpensive: null,
    cheapest: null,
  });

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await productServices.getAllproduct();
      setProducts(res);
      
      // Calculate analytics
      const totalProducts = res.length;
      const totalValue = res.reduce((sum, item) => sum + (item.prd_price * item.prd_qty), 0);
      const totalQuantity = res.reduce((sum, item) => sum + parseInt(item.prd_qty), 0);
      const avgPrice = totalProducts > 0 ? res.reduce((sum, item) => sum + parseFloat(item.prd_price), 0) / totalProducts : 0;
      const lowStock = res.filter(item => item.prd_qty < 10).length;
      const highValue = res.filter(item => item.prd_price * item.prd_qty > 1000).length;
      
      const sortedByPrice = [...res].sort((a, b) => b.prd_price - a.prd_price);
      const mostExpensive = sortedByPrice[0] || null;
      const cheapest = sortedByPrice[sortedByPrice.length - 1] || null;
      
      setAnalytics({
        totalProducts,
        totalValue,
        totalQuantity,
        avgPrice,
        lowStock,
        highValue,
        mostExpensive,
        cheapest,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
                <NavLink to="/" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors ">
                  📊 Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📦 Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/analytics" className="block px-4 py-3 rounded bg-sky-700">
                  📈 Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  🏷️ Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-product" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  ➕ Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  ⚙️ Settings
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-sky-800">
            <p className="text-sm text-gray-300">© 2024 Product Manager</p>
          </div>
        </aside>

        <main className="flex-1 ml-64 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Loading Analytics...</p>
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

      {/* Main Content - with margin for fixed sidebar */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Analytics & Reports</h2>
            <p className="text-gray-600">Detailed insights into your product inventory</p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{analytics.totalProducts}</p>
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
                  <p className="text-3xl font-bold text-gray-800 mt-1">${analytics.totalValue.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Low Stock Items</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{analytics.lowStock}</p>
                  <p className="text-xs text-gray-500 mt-1">Less than 10 units</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">High Value Items</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{analytics.highValue}</p>
                  <p className="text-xs text-gray-500 mt-1">Value over $1,000</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <span className="text-2xl">💎</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Price Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Average Price</span>
                  <span className="text-2xl font-bold text-green-600">${analytics.avgPrice.toFixed(2)}</span>
                </div>
                
                {analytics.mostExpensive && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Most Expensive Product</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={analytics.mostExpensive.prd_image}
                          alt={analytics.mostExpensive.prd_name}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{analytics.mostExpensive.prd_name}</p>
                          <p className="text-sm text-gray-500">ID: {analytics.mostExpensive.prd_id}</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600">${analytics.mostExpensive.prd_price}</span>
                    </div>
                  </div>
                )}

                {analytics.cheapest && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Cheapest Product</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={analytics.cheapest.prd_image}
                          alt={analytics.cheapest.prd_name}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{analytics.cheapest.prd_name}</p>
                          <p className="text-sm text-gray-500">ID: {analytics.cheapest.prd_id}</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-orange-600">${analytics.cheapest.prd_price}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Inventory Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Inventory Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Total Units in Stock</span>
                    <span className="text-2xl font-bold text-purple-600">{analytics.totalQuantity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Low Stock Alert</span>
                    <span className="text-2xl font-bold text-red-600">{analytics.lowStock}</span>
                  </div>
                  <p className="text-sm text-gray-600">Products with less than 10 units need restocking</p>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Total Inventory Value</span>
                    <span className="text-2xl font-bold text-indigo-600">${analytics.totalValue.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600">Combined value of all products in stock</p>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Products Table */}
          {analytics.lowStock > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Low Stock Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-red-50 border-b-2 border-red-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Qty</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(item => item.prd_qty < 10)
                      .map((item) => (
                        <tr key={item.prd_id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-gray-600">{item.prd_id}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.prd_image}
                                alt={item.prd_name}
                                className="w-10 h-10 object-cover rounded-lg border"
                              />
                              <span className="font-medium text-gray-700">{item.prd_name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {item.prd_qty}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-green-600 font-semibold">${item.prd_price}</td>
                          <td className="py-3 px-4">
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                              Restock Soon
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;