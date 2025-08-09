// src/components/OrdersTable.jsx

export default function OrdersTable() {
  const orders = [
    { id: 1, product: 'Travel Bag', customer: 'Alice Johnson', amount: 59.99, status: 'Shipped' },
    { id: 2, product: 'Leather Backpack', customer: 'Bob Smith', amount: 74.99, status: 'Processing' },
    { id: 3, product: 'Business Tote', customer: 'Carla Lee', amount: 120.0, status: 'Delivered' },
    { id: 4, product: 'Canvas Bag', customer: 'David Kim', amount: 45.5, status: 'Cancelled' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-2xl ring-1 ring-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-800">
          <tr>
            <th className="px-6 py-4 font-semibold">Order ID</th>
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Amount</th>
            <th className="px-6 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-700">{order.id}</td>
              <td className="px-6 py-4">{order.product}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4 text-green-600 font-semibold">${order.amount.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
