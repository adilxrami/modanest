;
// pages/Settings.jsx
export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>

      <form className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Display Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
