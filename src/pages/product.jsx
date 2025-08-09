export default function Product({ name, price, image, onClick }) {
  console.log("🧩 Props received in <Product />:", { name, price, image });

  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">${price}</p>
    </div>
  );
}
