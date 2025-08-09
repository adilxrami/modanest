import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/Approutes';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader'; // Make sure you have this

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate route change delay (adjust as needed or replace with actual data fetch logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second loading screen

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <AppRoutes />
          <Footer />
        </>
      )}
    </>
  );
}
