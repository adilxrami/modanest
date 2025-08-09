import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="bg-white min-h-screen px-6 py-12 md:px-20">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty.{" "}
          <Link
            to="/products"
            className="text-[#c49b66] font-semibold hover:underline"
          >
            Start shopping →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-8">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-lg p-5 shadow-sm"
              >
                <div className="flex items-center gap-5 w-full md:w-2/3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Color:{" "}
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-gray-300 align-middle ml-1"
                        style={{ backgroundColor: item.selectedColor }}
                      ></span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedColor,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-center gap-2">
                  <p className="text-gray-700 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.selectedColor)
                    }
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-between items-center flex-col md:flex-row">
            <p className="text-xl text-gray-800 font-bold">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 md:mt-0 bg-[#c49b66] hover:bg-[#b8874d] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
