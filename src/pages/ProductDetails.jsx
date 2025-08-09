import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);
        setLoading(false);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }
    addToCart({ ...product, selectedColor, quantity });
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p className="p-6">⏳ Loading product details...</p>;
  if (!product || !product.title) return <p className="text-red-600">❌ Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <Link to="/products" className="text-blue-600 hover:underline inline-block">← Back to Products</Link>

      <div className="grid md:grid-cols-2 gap-10 items-start bg-white shadow-md rounded-2xl p-6">
        {/* Left Column with Image Preview and Thumbnails */}
        <div className="flex gap-4" data-aos="zoom-in">
          {/* Thumbnails Vertical */}
          <div className="flex flex-col space-y-3">
            {product.images?.slice(0, 6).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-black' : 'border-gray-300'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden w-[320px] h-[384px] group border border-gray-200 shadow">
            <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md z-10">Hover to Zoom 🔍</span>
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-[1.5] cursor-zoom-in"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.transformOrigin = "center";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4" data-aos="fade-left">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-gray-700 text-sm">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <span className="text-yellow-500 text-sm">⭐ {product.rating} / 5</span>
          </div>

          {/* Color Selection */}
          <div>
            <h2 className="text-sm font-semibold mb-1">Color:</h2>
            <div className="flex space-x-2">
              {(product.colors || ["#dc2626", "#2563eb", "#059669", "#9333ea"]).map((color, i) => (
                <button
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart in same row */}
          <div>
            <h2 className="text-sm font-semibold mb-1">Quantity:</h2>
            <div className="flex items-center justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button onClick={decreaseQty} className="w-7 h-7 rounded-full bg-gray-200 text-base font-bold">-</button>
                <span className="text-base">{quantity}</span>
                <button onClick={increaseQty} className="w-7 h-7 rounded-full bg-gray-200 text-base font-bold">+</button>
              </div>

              {/* Add to Cart Button aligned right */}
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-[#c49b66] hover:bg-[#b8874d] text-white text-base font-semibold rounded-full shadow transition hover:scale-105 active:scale-95"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>

          {/* Specs */}
          <ul className="text-sm text-gray-600 mt-4">
            <li><strong>Stock:</strong> {product.stock}</li>
            <li><strong>Discount:</strong> {product.discountPercentage}%</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
