import { useState } from "react";

const ProductDetail = ({ product, onAddToCart, onClose }) => {
  const [qty, setQty] = useState(1);
  const isLowStock = product.stock <= 3;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
    });
  };

  return (
    <div className="max-w-lg bg-white rounded-xl shadow-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />

      {/* Price */}
      <div className="flex justify-between items-center border-b py-3">
        <span className="text-gray-600">Price</span>
        <span className="text-indigo-600 font-bold text-xl">
          ${product.price.toFixed(2)}
        </span>
      </div>

      {/* Availability */}
      <div className="flex justify-between items-center border-b py-3">
        <span className="text-gray-600">Availability</span>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            isLowStock
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isLowStock ? "Low Stock" : "In Stock"}
        </span>
      </div>

      {/* Quantity Available */}
      <div className="flex justify-between items-center border-b py-3">
        <span className="text-gray-600">Quantity Available</span>
        <span className="font-semibold">{product.stock} units</span>
      </div>

      {/* Product ID */}
      <div className="flex justify-between items-center border-b py-3">
        <span className="text-gray-600">Product ID</span>
        <span className="font-semibold">#{product.id}</span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between py-4">
        <span className="text-gray-600 font-medium">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            onClick={() => setQty(q => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="font-semibold text-lg w-12 text-center">{qty}</span>
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            onClick={() => setQty(q => Math.min(product.stock, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-indigo-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Price</span>
          <span className="text-2xl font-bold text-indigo-600">
            ${(product.price * qty).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
        <button 
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;