// import React, { useState } from "react";
// import { productServices } from "../service/ProductService";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         prd_name: "",
//         prd_qty: "",
//         prd_price: "",
//         prd_image: "",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("prd_name", form.prd_name);
//         formData.append("prd_qty", form.prd_qty);
//         formData.append("prd_price", form.prd_price);
//         formData.append("prd_image", form.prd_image); // FILE

//         try {
//             await productServices.createProduct(formData);
//             navigate("/"); // ✅ route, not file path
//         } catch (err) {
//             console.error("Create failed", err);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-200 flex items-center justify-center">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded shadow-md hover:shadow-green-500 w-[400px]">

//                 <h2 className="text-3xl font-semibold mb-4">Add Product</h2>
//                 <input
//                     name="prd_name"
//                     placeholder="Product Name"
//                     className="border p-2 w-full mb-3"
//                     onChange={handleChange}
//                     required/>

//                 <input
//                     name="prd_qty"
//                     type="number"
//                     placeholder="Quantity"
//                     className="border p-2 w-full mb-3"
//                     onChange={handleChange}
//                     required/>

//                 <input
//                     name="prd_price"
//                     type="number"
//                     placeholder="Price"
//                     className="border p-2 w-full mb-3"
//                     onChange={handleChange}
//                     required/>

//                 <input
//                     type="file"
//                     accept="image/*"
//                     className="border p-2 w-full mb-4 hover:cursor-pointer"
//                     onChange={(e) =>
//                         handleChange({ target: { name: "prd_image", value: e.target.files[0] } })
//                     }
//                     required/>


//                 <button className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded w-full hover:cursor-pointer " >
//                     Save Product
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddProduct;


import React, { useState } from "react";
import { productServices } from "../service/ProductService";
import { NavLink, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    prd_name: "",
    prd_qty: "",
    prd_price: "",
    prd_image: null,
  });

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
    
    // Validation
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
      await productServices.createProduct(formData);
      navigate("/");
    } catch (err) {
      console.error("Create failed", err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/products");
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Add New Product
            </h2>
            <p className="text-gray-600 mt-1">Fill in the details to add a new product to your inventory</p>
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
                <label
                  htmlFor="prd_image"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Product Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sky-900 transition-colors">
                  <input
                    type="file"
                    id="prd_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="prd_image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {imagePreview ? (
                      <div className="mb-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300"
                        />
                      </div>
                    ) : (
                      <div className="mb-4">
                        <svg
                          className="w-16 h-16 text-gray-400 mx-auto"
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
                    )}
                    <p className="text-gray-600 font-medium mb-1">
                      {imagePreview ? "Click to change image" : "Click to upload image"}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
                {form.prd_image && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    File selected: {form.prd_image.name}
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
                  className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Product
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

export default AddProduct;