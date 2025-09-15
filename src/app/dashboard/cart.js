"use client";

export default function Cart({
  cart,
  totalPrice,
  removeFromCart,
  increaseQty,
  decreaseQty,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
      <h2 className="text-lg font-semibold text-[#647FBC] mb-4 flex items-center justify-between">
        <span>🛒 Cart ({cart.length})</span>
        <span className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-bold text-[#2F4B8F]">${totalPrice.toFixed(2)}</span>
        </span>
      </h2>

      {cart.length > 0 ? (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              {/* Top: image + name + remove */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded border"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-800">
                    {item.title}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 border rounded hover:bg-gray-100 text-gray-600 text-xs"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 border rounded hover:bg-gray-100 text-gray-600 text-xs"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-bold text-[#2F4B8F]">
                  ${item.price * item.quantity}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
