// src/pages/ManageProducts.jsx
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Leather Travel Bag",
        category: "womens-bags",
        price: 59.99,
        rating: 4.7,
        thumbnail: "https://via.placeholder.com/80x60?text=Bag",
      },
      {
        id: 2,
        title: "Elegant Office Shirt",
        category: "mens-shirts",
        price: 34.95,
        rating: 4.3,
        thumbnail: "https://via.placeholder.com/80x60?text=Shirt",
      },
    ]);
  }, []);

  const handleEdit = (id) => {
    alert("✏️ Edit product ID: " + id);
  };

  const handleDelete = (id) => {
    if (confirm("❌ Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <DashboardHeader />


        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Rating</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">{product.title}</td>
                  <td className="px-6 py-3 capitalize text-gray-600">{product.category}</td>
                  <td className="px-6 py-3 text-green-600 font-semibold">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-3 text-yellow-500">⭐ {product.rating}</td>
                  <td className="px-6 py-3 flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                    >
                      <Trash size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                    🗂️ No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
