import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiSun, FiMoon, FiUser } from 'react-icons/fi';
import CartSidebar from '../components/cart/CartSidebar';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { cart, updateQuantity, removeFromCart, getCartCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AccountPro</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Products
              </Link>
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Dashboard
              </Link>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                />
              </div>
            </form>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <FiShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white text-sm focus:outline-none"
                  />
                </div>
              </form>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Home</Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Products</Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Dashboard</Link>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); navigate('/cart'); }}
      />
    </>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <span className="text-white font-bold text-lg">AccountPro</span>
          </div>
          <p className="text-sm text-gray-400">
            Your premium shopping destination for quality products at great prices.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-400">support@accountpro.com</p>
          <p className="text-sm text-gray-400 mt-1">+1 (555) 000-0000</p>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AccountPro. All rights reserved.
      </div>
    </div>
  </footer>
);

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
