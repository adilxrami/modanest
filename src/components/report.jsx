import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { ArrowUpRight, ArrowDownRight } from "lucide-react"; // ✅ Trend icons

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';

const revenueData = [
  { month: "Jan", current: 18, previous: 22 },
  { month: "Feb", current: 20, previous: 19 },
  { month: "Mar", current: 24, previous: 20 },
  { month: "Apr", current: 28, previous: 26 },
  { month: "May", current: 30, previous: 28 },
  { month: "Jun", current: 27, previous: 29 },
];

const pieData = [
  { name: "Direct", value: 38.4, color: "#6366F1" },
  { name: "Affiliate", value: 25.1, color: "#A78BFA" },
  { name: "Sponsored", value: 19.5, color: "#F472B6" },
  { name: "E-mail", value: 17.0, color: "#FCD34D" },
];

const salesByLocation = [
  { location: "New York", sales: 72000 },
  { location: "San Francisco", sales: 39000 },
  { location: "Sydney", sales: 25000 },
  { location: "Singapore", sales: 61000 },
];

export default function ReportPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-white">
      <DashboardSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <DashboardHeader />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Report Analysis</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Sales", value: "$34,456.00", trend: "14%", direction: "up" },
            { label: "Total Orders", value: "3,456", trend: "17%", direction: "down" },
            { label: "Total Revenue", value: "$1,456.00", trend: "14%", direction: "up" },
            { label: "Total Customers", value: "42,456", trend: "11%", direction: "down" },
          ].map((item, idx) => {
            const isUp = item.direction === "up";
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition duration-300"
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{item.value}</p>
                <div className={`flex items-center text-sm mt-1 ${isUp ? "text-green-600" : "text-red-500"}`}>
                  {isUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {item.trend} {isUp ? "increase" : "decrease"} this month
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-2xl border shadow-md col-span-2 hover:shadow-lg transition">
            <p className="font-semibold mb-3 text-gray-700">📈 Revenue (Current vs Previous Week)</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#6366F1" strokeWidth={3} name="Current Week" />
                <Line type="monotone" dataKey="previous" stroke="#A78BFA" strokeWidth={3} name="Previous Week" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded-2xl border shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-3 text-gray-700">📊 Total Sales by Type</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Location */}
        <div className="bg-white p-5 rounded-2xl border shadow-md hover:shadow-lg transition">
          <p className="font-semibold mb-3 text-gray-700">🌍 Sales by Location</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left">Location</th>
                <th className="text-right">Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesByLocation.map((item, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-2">{item.location}</td>
                  <td className="text-right py-2 font-medium text-gray-800">
                    ${item.sales.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
