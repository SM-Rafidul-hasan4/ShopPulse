import React, { useState } from "react";
import { useCart } from "../AllFunction/CartFunction";
import OrderForm from "../OrderForm/OrderForm";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [showOrderForm, setShowOrderForm] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🛍️ Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => {
              const imageUrl =
                item.thumbnail || item.image || "https://via.placeholder.com/150";

              return (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center gap-4 w-full md:w-1/3">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <h4 className="font-semibold">{item.title}</h4>
                  </div>

                  <div className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-1/4 justify-center">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-4 md:mt-0 w-full md:w-1/6 text-center">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <p className="font-bold text-green-600 mt-4 md:mt-0 w-full md:w-1/6 text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 md:mt-0 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex justify-end">
            <button
              className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600 transition"
              onClick={() => setShowOrderForm(true)}
            >
              Buy Now (${totalPrice.toFixed(2)})
            </button>
          </div>
        </>
      )}

      {/* === Order Form Modal === */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative max-h-[90vh] overflow-y-auto shadow-lg">
            <OrderForm
              cartItems={cartItems}
              totalPrice={totalPrice}
              onClose={() => setShowOrderForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
