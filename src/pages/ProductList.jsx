import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bagsRes, dressesRes, shirtsRes, topsRes, skirtsRes] = await Promise.all([
          fetch("https://dummyjson.com/products/category/womens-bags"),
          fetch("https://dummyjson.com/products/category/womens-dresses"),
          fetch("https://dummyjson.com/products/category/mens-shirts"),
          fetch("https://dummyjson.com/products/category/tops"),
          fetch("https://dummyjson.com/products/category/skirts"),
        ]);

        const bagsData = await bagsRes.json();
        const dressesData = await dressesRes.json();
        const shirtsData = await shirtsRes.json();
        const topsData = await topsRes.json();
        const skirtsData = await skirtsRes.json();

        const combined = [
          ...bagsData.products,
          ...dressesData.products,
          ...shirtsData.products,
          ...topsData.products,
          ...skirtsData.products,
        ];

        setProducts(combined);
        setFiltered(combined);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredList = products;

    if (category !== "all") {
      filteredList = filteredList.filter((p) => p.category === category);
    }

    if (search.trim() !== "") {
      filteredList = filteredList.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredList);
  }, [search, category, products]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const categories = [
    { label: "All Categories", value: "all", emoji: "🧰" },
    { label: "Women's Bags", value: "womens-bags", emoji: "👜" },
    { label: "Women's Dresses", value: "womens-dresses", emoji: "👗" },
    { label: "Men's Shirts", value: "mens-shirts", emoji: "👔" },
    { label: "Tops", value: "tops", emoji: "👚" },
    { label: "Skirts", value: "skirts", emoji: "🩳" },
  ];

  if (loading) return <p className="p-6 text-center text-gray-500">⏳ Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-gray-800">
        <span style={{ fontFamily: "Pacifico, cursive" }}>Trending Fashion</span>
      </h1>

      {/* 🔎 Search + Filter */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 mb-12 relative z-50">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="🔍 Search your favorite styles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition-all"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>

        {/* Category Dropdown */}
        <div ref={dropdownRef} className="relative w-full md:w-64 z-50">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 shadow-sm font-semibold flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <span>
              {categories.find((c) => c.value === category)?.emoji}{" "}
              {categories.find((c) => c.value === category)?.label}
            </span>
            <svg className="w-4 h-4 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setCategory(cat.value);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-100 transition-all ${
                    cat.value === category ? "bg-gray-100 font-bold" : ""
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-16">
          😕 No products found. Try adjusting your filters or search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 z-10 relative">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer group"
              data-aos="fade-up"
            >
              <div className="overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 truncate">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold">${product.price}</span>
                  <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
