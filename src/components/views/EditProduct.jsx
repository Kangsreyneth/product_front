import React, { useEffect, useState } from "react";
import { productServices } from "../service/ProductService";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    prd_name: "",
    prd_qty: "",
    prd_price: "",
    prd_image: null,
    existing_image: ""
  });

  useEffect(() => {
    fetchProductById();
  }, [id]);

  const fetchProductById = async () => {
  try {
    setFetchLoading(true);

    const productData = await productServices.getById(id);

    if (!productData) {
      setError("Product not found");
      return;
    }

    setForm({
      prd_name: productData.prd_name ?? "",
      prd_qty: productData.prd_qty ?? "",
      prd_price: productData.prd_price ?? "",
      prd_image: null,
      existing_image: productData.prd_image ?? ""
    });

    setImagePreview(productData.prd_image ?? null);

  } catch (err) {
    console.error(err);
    setError("Failed to load product");
  } finally {
    setFetchLoading(false);
  }
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, prd_image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.prd_name || !form.prd_qty || !form.prd_price) {
      setError("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("prd_name", form.prd_name);
    formData.append("prd_qty", form.prd_qty);
    formData.append("prd_price", form.prd_price);

    if (form.prd_image) {
      formData.append("prd_image", form.prd_image);
    }

    try {
      setLoading(true);
      setError("");
      await productServices.updateProduct(id, formData);
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  if (fetchLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-sky-900 text-white flex flex-col">
          <div className="p-6 border-b border-sky-800">
            <h1 className="text-2xl font-bold">Product Dashboard</h1>
          </div>
          <nav className="flex-1 p-4">
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
              <li>
                <NavLink to="/analytics" className="block px-4 py-3 rounded hover:bg-sky-800 transition-colors">
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

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-sky-900 mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xl text-gray-600">Loading Product...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-900 text-white flex flex-col">
        <div className="p-6 border-b border-sky-800">
          <h1 className="text-2xl font-bold">Product Dashboard</h1>
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Edit Product
            </h2>
            <p className="text-gray-600 mt-1">Update product information (ID: {id})</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Product Name */}
              <div className="mb-6">
                <label
                  htmlFor="prd_name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="prd_name"
                  name="prd_name"
                  value={form.prd_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-transparent transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Quantity and Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Quantity */}
                <div>
                  <label
                    htmlFor="prd_qty"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="prd_qty"
                    name="prd_qty"
                    value={form.prd_qty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-transparent transition-all"
                    placeholder="Enter quantity"
                    min="0"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="prd_price"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="prd_price"
                    name="prd_price"
                    value={form.prd_price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-transparent transition-all"
                    placeholder="Enter price"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Image
                </label>
                
                {/* Current Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                    <img
                      src={imagePreview}
                      alt="Current product"
                      className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300"
                    />
                  </div>
                )}

                {/* Upload New Image */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sky-900 transition-colors">
                  <input
                    type="file"
                    id="prd_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="prd_image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium mb-1">
                      {form.prd_image ? "Click to change image" : "Click to upload new image"}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB (Optional)</p>
                  </label>
                </div>

                {form.prd_image && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    New file selected: {form.prd_image.name}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Update Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;