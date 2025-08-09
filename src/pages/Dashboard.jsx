// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import products from '../data/products';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsCards from '../components/StatsCards';
import ProductTable from '../components/ProductTable';
import OrdersTable from '../components/OrdersTable';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    setStats({
      totalProducts: products.length,
      totalOrders: 12,
      revenue: 870.56,
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <DashboardHeader />
        <StatsCards stats={stats} />

        <h2 className="text-xl font-semibold my-4">Product List</h2>
        <ProductTable products={products} />

        <h2 className="text-xl font-semibold my-6">Order List</h2>
        <OrdersTable />

        {/* ✅ Removed: <Report /> */}
      </div>
    </div>
  );
}
