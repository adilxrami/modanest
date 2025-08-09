// src/components/OrdersTable.jsx

export default function OrdersTable() {
  const orders = [
    { id: 1, product: 'Bag', customer: 'Alice', amount: 59.99, status: 'Shipped' },
    { id: 2, product: 'Backpack', customer: 'Bob', amount: 74.99, status: 'Processing' },
    { id: 3, product: 'Travel Duffel', customer: 'Carol', amount: 89.95, status: 'Delivered' },
    { id: 4, product: 'Laptop Sleeve', customer: 'Dave', amount: 42.5, status: 'Cancelled' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-md ring-1 ring-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 font-semibold text-gray-700">Order ID</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Product</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Customer</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Amount</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-800 font-medium">{order.id}</td>
              <td className="px-6 py-4">{order.product}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4 text-green-600 font-semibold">${order.amount.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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
