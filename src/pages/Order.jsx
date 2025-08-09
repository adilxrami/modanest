import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // 🔄 Load saved orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6 text-[#c49b66]">📦 Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-[#c49b66]"
            data-aos="fade-up"
          >
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <p className="text-gray-500 text-sm">Status: <span className="font-medium">{order.status}</span></p>
                <p className="text-gray-500 text-sm">Estimated Delivery: <span className="font-medium">{order.estimatedDelivery}</span></p>
              </div>
              <div className="text-right">
                <p className="text-gray-700 font-semibold">Total: ${order.total.toFixed(2)}</p>
                <Link to="/thank-you" className="text-sm text-[#c49b66] hover:underline">
                  View Details →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img src={item.thumbnail || item.image} alt={item.name || item.title} className="w-16 h-16 object-cover rounded-lg border" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.name || item.title}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <div className="text-center pt-6">
        <Link to="/" className="text-[#c49b66] font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
