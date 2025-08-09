import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Settings,
  UploadCloud,
  FileEdit,
  BarChart2, // ✅ Added for Report icon
} from 'lucide-react';

export default function DashboardSidebar() {
  return (
    <div className="w-64 min-h-screen bg-white shadow-md px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <Package size={18} />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/upload-product"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <UploadCloud size={18} />
            Upload Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage-products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <FileEdit size={18} />
            Manage Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <ClipboardList size={18} />
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <BarChart2 size={18} />
            Report
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
