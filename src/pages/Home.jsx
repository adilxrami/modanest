import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-bg.png';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';
import ChatBotWidget from '../components/ChatBotWidget';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [berkinBags, setBerkinBags] = useState([]);
  const [beautyProducts, setBeautyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBeauty, setLoadingBeauty] = useState(true);
useEffect(() => {
  AOS.init({ once: true });

  Promise.all([
    fetch('https://dummyjson.com/products/category/womens-bags').then(res => res.json()),
    fetch('https://dummyjson.com/products/category/fragrances').then(res => res.json()),
    fetch('https://dummyjson.com/products/category/skincare').then(res => res.json())
  ])
    .then(([bagsData, fragranceData, skincareData]) => {
      setBerkinBags(bagsData.products.slice(0, 4));
      setLoading(false);

      const selectedFragrances = fragranceData.products.slice(0, 4);
      const selectedSkincare = skincareData.products.slice(0, 4);
      const combinedBeauty = [...selectedFragrances, ...selectedSkincare];

      setBeautyProducts(combinedBeauty);
      setLoadingBeauty(false);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
      setLoadingBeauty(false);
    });
}, []);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[85vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-label="Hero section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-0"></div>
        <div className="relative z-10 p-10 max-w-3xl text-center text-white animate-fade-in">
          <h1
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-xl"
            data-aos="fade-up"
          >
            Welcome to ModaNest
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-gray-200 font-light"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Where fashion finds its nest — discover timeless elegance and style that speaks.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-[#c49b66] text-white px-8 py-4 font-semibold rounded-full hover:bg-[#b8874d] transition-all duration-300 shadow-lg hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Explore ModaNest
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-28 px-6 md:px-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-sm uppercase tracking-wider text-[#c49b66] font-semibold">
              Curated for You
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 leading-tight">
              ModaNest Featured Collection
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Handpicked Berkin-style bags that blend fashion and function — perfect for your modern wardrobe.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg animate-pulse">Loading featured ModaNest picks...</p>
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {berkinBags.map((product, index) => (
                <div
                  key={product.id}
                  className="hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="200">
            <Link
              to="/products"
              className="inline-block bg-[#c49b66] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-[#b8874d] transition-transform hover:scale-105 active:scale-95"
            >
              Browse Full ModaNest Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Services & Beauty Philosophy Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-white py-24 px-6 md:px-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-[#c49b66] font-medium" data-aos="fade-up">
            What Makes Us Special
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Experience Fashion as a Lifestyle
          </h2>
          <p
            className="max-w-3xl mx-auto text-lg text-gray-600 mb-16"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            At ModaNest, we blend elegance with everyday practicality. Discover a seamless shopping journey,
            personal style empowerment, and products that do more than look good — they *feel* right.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
            {[
              {
                icon: '💼',
                title: 'Styling Concierge',
                desc: 'Get personalized recommendations based on your taste. Our AI stylist and human experts help you pick the perfect bag or outfit.',
              },
              {
                icon: '🪞',
                title: 'Timeless Beauty',
                desc: 'ModaNest is rooted in the belief that fashion should highlight who you are, not mask it. We design pieces meant to elevate your natural elegance.',
              },
              {
                icon: '🎁',
                title: 'Luxury Gifting',
                desc: 'Want to surprise someone special? Our premium packaging and thoughtful touches make every delivery a joyful unboxing moment.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-8 transition-transform hover:shadow-xl hover:-translate-y-1"
                data-aos="zoom-in-up"
                data-aos-delay={idx * 200}
              >
                <div className="text-4xl mb-4 text-[#c49b66]">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16" data-aos="fade-up" data-aos-delay="400">
            <Link
              to="/products"
              className="inline-block px-10 py-4 bg-[#c49b66] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#b8874d] transition-transform hover:scale-105 active:scale-95"
            >
              Discover Your Style Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Beauty Collection Section */}
      <section className="relative py-28 px-6 md:px-20 bg-pink-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-sm uppercase tracking-wider text-pink-600 font-semibold">
              Glow & Glam
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 leading-tight">
              Beauty Essentials
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Moisturizers, lipsticks & fragrances curated to elevate your self-care game.
            </p>
          </div>

          {loadingBeauty ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg animate-pulse">Loading beauty products...</p>
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {beautyProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: '🚚',
              title: 'Free Shipping',
              desc: 'On all ModaNest orders over $50 — shipped with care.',
            },
            {
              icon: '🌟',
              title: 'Premium Quality',
              desc: 'Fashion-forward bags made with enduring quality and design.',
            },
            {
              icon: '🔒',
              title: 'Secure Checkout',
              desc: 'Shop ModaNest confidently with full encryption and protection.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group transition-transform duration-300 ease-in-out"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div className="mb-5 text-5xl text-[#c49b66] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <ChatBotWidget />
    </div>
  );
}
