// src/components/DashboardHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4"
>
      {/* Logo / Title */}
      <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
        <Link to="/dashboard">🛍️ MyStore Admin</Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-500 transition">
          Dashboard
        </Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-500 transition">
          Products
        </Link>
        <Link to="/orders" className="text-gray-700 hover:text-blue-500 transition">
          Orders
        </Link>
        <Link to="/users" className="text-gray-700 hover:text-blue-500 transition">
          Users
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
};

export default DashboardHeader;
