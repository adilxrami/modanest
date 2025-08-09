import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between h-full">
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover rounded-xl mb-4 hover:scale-105 transition-transform duration-300"
        />

        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
        <p className="text-emerald-600 font-semibold text-lg mb-4">${product.price}</p>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="mt-auto inline-block w-full text-center bg-black/80 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-black transition-all duration-300"
      >
        View Product
      </Link>
    </div>
  );
}
