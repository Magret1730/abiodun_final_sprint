import { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import ProductListings from './pages/ProductListings/ProductListings';
import Header from './components/Header/Header';
import About from './components/About/About';
import Spinner from './components/Spinner/Spinner';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Contact from './components/Contact/Contact';
import CartPage from './pages/CartPage/CartPage';
import Footer from './components/Footer/Footer';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast configuration
  const showToast = (type, message) => {
    if (type === "success") {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    } else if (type === "error") {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
  };

  // Fetching the products
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsFromServer = await fetchProducts();
        setProducts(productsFromServer);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
        showToast("error", "Failed to fetch products");
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <ProductListings products={products} /> } />
        <Route path="/products/:id" element={ <ProductDetails /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/cart" element={ <CartPage /> } />
        <Route path="/checkout" element={ <CheckoutPage /> } />
        <Route path="/payment" element={ <PaymentPage /> } />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App;

