import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    paymentMethod: "creditCard",
  });

  // Get location on component mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Reverse geocode using Nominatim (free & no API key)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();

            const fullAddress = data.display_name || "";
            setFormData((prev) => ({ ...prev, address: fullAddress }));
          } catch (err) {
            console.error("Error getting location:", err);
          }
        },
        (error) => {
          console.warn("Location access denied:", error);
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (!formData.name || !formData.address || !formData.email) {
      alert("Please complete all fields.");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      status: "Processing",
      estimatedDelivery: "Aug 5, 2025",
      total: totalPrice,
      items: cartItems,
      customer: formData,
      date: new Date().toISOString(),
    };

    try {
      const prevOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = [...prevOrders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      localStorage.setItem("lastOrder", JSON.stringify(newOrder));

      if (clearCart) clearCart();

      navigate("/thank-you");
    } catch (error) {
      console.error("Failed to save order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-semibold text-gray-800 mb-10 border-b pb-4">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SECTION: FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-8"
        >
          {/* SHIPPING */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="input-style"
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                rows={4}
                value={formData.address}
                onChange={handleChange}
                className="input-style"
              ></textarea>
            </div>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Method
            </h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="input-style"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          {/* Submit Button for Mobile View */}
          <button
            type="submit"
            className="lg:hidden w-full bg-[#c49b66] hover:bg-[#b8874d] transition-all duration-200 text-white font-semibold py-3 rounded-full text-lg shadow-md hover:scale-[1.02] active:scale-95"
          >
            ✅ Place Order
          </button>
        </form>

        {/* RIGHT SECTION: ORDER SUMMARY */}
        <div className="w-full lg:w-[380px] bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-3 text-sm text-gray-700"
                  >
                    <span className="font-medium">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Desktop Place Order */}
              <button
                type="submit"
                className="hidden lg:block w-full bg-[#c49b66] hover:bg-[#b8874d] transition-all duration-200 text-white font-semibold py-3 rounded-full text-lg shadow-md hover:scale-[1.02] active:scale-95"
              >
                ✅ Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
