import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#c49b66]">About ModaNest</h3>
          <p className="text-sm leading-relaxed">
            ModaNest is your destination for timeless, elegant fashion accessories. We blend luxury design with everyday functionality to bring you the perfect bag for any moment.
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#c49b66]">Customer Support</h3>
          <ul className="text-sm space-y-2">
            <li><Link to="/faq" className="hover:text-[#c49b66]">FAQs</Link></li>
            <li><Link to="/shipping" className="hover:text-[#c49b66]">Shipping & Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-[#c49b66]">Returns & Exchanges</Link></li>
            <li><Link to="/contact" className="hover:text-[#c49b66]">Contact Us</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#c49b66]">Legal</h3>
          <ul className="text-sm space-y-2">
            <li><Link to="/privacy-policy" className="hover:text-[#c49b66]">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-[#c49b66]">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-[#c49b66]">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#c49b66]">Stay in Touch</h3>
          <p className="text-sm mb-4">
            Get the latest updates, exclusive offers, and styling tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c49b66]"
            />
            <button
              type="submit"
              className="bg-[#c49b66] text-white px-4 py-2 rounded-md hover:bg-[#b8874d] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {currentYear} ModaNest. All rights reserved.</p>
        
      </div>
    </footer>
  );
}
