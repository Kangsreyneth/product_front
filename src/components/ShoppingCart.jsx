import React from "react";

const ShoppingCart = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart, onClose, totalPrice }) => {
  const handleCheckout = () => {
    alert(`Checkout - Total: $${totalPrice.toFixed(2)}\n\nThis would redirect to payment page.`);
  };

  return (
    <>
      {/* Sidebar - Slide in from right - NO OVERLAY */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-96 md:w-[28rem] bg-white shadow-2xl z-50 flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping Cart
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 font-semibold mb-2">កន្ត្រករបស់អ្នកទទេ</p>
              <p className="text-sm sm:text-base text-gray-500">បន្ថែមផលិតផលដើម្បីចាប់ផ្តើម!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 hover:shadow-lg hover:border-indigo-200 transition-all duration-200"
                >
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                      {item.quantity}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-indigo-600 font-bold mb-3 text-base sm:text-lg">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all font-bold text-gray-700"
                      >
                        -
                      </button>
                      <span className="font-bold w-10 sm:w-12 text-center text-base sm:text-lg bg-gray-100 rounded-lg py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all font-bold text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button & Subtotal */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemoveItem(item.productId)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                      title="លុបចេញ"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                      <p className="text-gray-900 font-bold text-base sm:text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        {cart.length > 0 && (
          <div className="border-t-2 border-gray-200 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white flex-shrink-0 shadow-lg">
            {/* Summary */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold text-gray-900">
                  ${(totalPrice * 0.1).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm sm:text-base">Proceed to Checkout</span>
              </button>
              
              <button
                onClick={onClearCart}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2.5 sm:py-3 rounded-xl transition-all hover:shadow-md"
              >
                <span className="text-sm sm:text-base">Clear Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;