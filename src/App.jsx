import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import OrderTracking from './pages/OrderTracking';
import NotFound from './pages/NotFound';
import { ROUTES } from './utils/constants';

const GOOGLE_CLIENT_ID =
  '114844774596-riiuivl9kbglsca3evs8ro611eeif7fk.apps.googleusercontent.com';

// Smooth scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <Routes>
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.PRODUCTS} element={<Products />} />
                  <Route
                    path={ROUTES.PRODUCT_DETAILS}
                    element={<ProductDetails />}
                  />
                  <Route path={ROUTES.CART} element={<Cart />} />
                  <Route
                    path={ROUTES.CHECKOUT}
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                  <Route
                    path={ROUTES.ORDER_TRACKING}
                    element={<OrderTracking />}
                  />
                  <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
