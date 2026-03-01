import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
