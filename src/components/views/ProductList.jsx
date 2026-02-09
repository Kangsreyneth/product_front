import React, { useEffect, useState } from "react";
import { productServices } from "../service/ProductService";
import { NavLink, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await productServices.getAllproduct();
      setProducts(res);
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
            <h1 className="text-2xl font-bold">🎽Product Management</h1>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📊 Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="block px-4 py-3 rounded bg-sky-700">
                  📦 Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-product" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  ➕ Add Product
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
            <h1 className="text-2xl font-bold">Product Dashboard</h1>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  📊 Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="block px-4 py-3 rounded bg-sky-700">
                  📦 Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-product" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
                  ➕ Add Product
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
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
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
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
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
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
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
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
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
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
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
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
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
      <main className="flex-1 ml-64 p-6 flex flex-col h-screen">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
          {/* Header - Sticky */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-100 pb-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3 sm:mb-0">
              Product List
            </h2>
            <NavLink
              to="/add-product"
              className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded shadow transition duration-200"
            >
              Add New
            </NavLink>
          </div>

          {/* Table Container - Scrollable */}
          <div className="flex-1 overflow-hidden bg-white rounded-lg shadow-md flex flex-col">
            {/* Table Header - Sticky */}
            <table className="w-full table-auto">
              <thead className="bg-sky-900 text-white sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
            </table>

            {/* Table Body - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full table-auto">
                <tbody>
                  {products.map((item) => (
                    <tr key={item.prd_id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{item.prd_id}</td>
                      <td className="py-3 px-4">
                        <img src={item.prd_image} alt={item.prd_name} className="w-16 h-16 object-cover rounded-lg border" />
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700">
                        {item.prd_name}
                      </td>
                      <td className="py-3 px-4">{item.prd_qty}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">
                        ${item.prd_price}
                      </td>
                      <td className="py-7 px-4 flex justify-center gap-4">
                        <button
                          className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow transition duration-150"
                          onClick={() => navigate(`/edit/${item.prd_id}`)}>
                          Edit
                        </button>

                        <button
                          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow transition duration-150"
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductList;