import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/checkout';
import ThankYou from '../pages/ThankYou';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import UploadProduct from '../pages/UploadProduct';
import ManageProducts from '../pages/ManageProducts';
import Order from '../pages/Order';
import Assistant from '../pages/Assistant';
import Report from '../components/report'; // ✅ Add this line (adjust path if needed)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/Signin" element={<Signin />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/upload-product" element={<UploadProduct />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/report" element={<Report />} /> {/* ✅ Added route */}
    </Routes>
  );
}
