import { FaShoppingBag } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="animate-spin-slow text-5xl text-black mb-4">
        <FaShoppingBag />
      </div>
      <h2 className="text-xl font-semibold animate-pulse">Loading your store...</h2>
    </div>
  );
}
