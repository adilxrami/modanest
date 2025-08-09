import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    setOrder(lastOrder);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gray-50">
      <div className="max-w-xl bg-white p-10 rounded-2xl shadow-md border border-gray-200 space-y-6">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 text-lg">
          Your order has been placed successfully. We’ve sent a confirmation to your email.
        </p>

        {order && (
          <div className="text-left text-gray-700 bg-gray-50 border rounded-lg p-4 mt-4 text-sm space-y-2">
            <p><span className="font-semibold">Order ID:</span> {order.id}</p>
            <p><span className="font-semibold">Delivery:</span> {order.estimatedDelivery}</p>
            <p><span className="font-semibold">Total:</span> ${order.total.toFixed(2)}</p>
            <p><span className="font-semibold">Items:</span> {order.items.length}</p>
          </div>
        )}

        <div className="space-y-3 pt-6">
          <Link
            to="/products"
            className="block w-full bg-[#c49b66] hover:bg-[#b8874d] text-white py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🛍️ Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="block w-full text-[#c49b66] hover:text-[#b8874d] underline text-sm font-medium"
          >
            View Your Orders →
          </Link>
        </div>
      </div>
    </div>
  );
}
