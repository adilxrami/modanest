// components/StatsCards.jsx
export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Products</p>
        <p className="text-xl font-bold">{stats.totalProducts}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Orders</p>
        <p className="text-xl font-bold">{stats.totalOrders}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Revenue</p>
        <p className="text-xl font-bold">${stats.revenue}</p>
      </div>
    </div>
  );
}
