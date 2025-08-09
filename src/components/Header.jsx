import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#c49b66]">
        ModaNest
      </Link>

      {/* Navigation */}
      <nav className="flex gap-6 items-center text-base font-medium">
        <Link to="/" className="text-gray-700 hover:text-[#c49b66] transition-colors">Home</Link>
        <Link to="/products" className="text-gray-700 hover:text-[#c49b66] transition-colors">Products</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-[#c49b66] transition-colors">Dashboard</Link>
        <Link to="/orders" className="text-gray-700 hover:text-[#c49b66] transition-colors">Orders</Link>
        {/* Cart Icon (hidden on Home) */}
        {!isHomePage && (
          <Link
            to="/cart"
            className="text-gray-700 hover:text-[#c49b66] transition relative flex items-center"
            aria-label="Cart"
          >
            🛒
            {totalItems > 0 && (
              <span className="ml-1 absolute -top-2 -right-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        )}
      </nav>
    </header>
  );
}
