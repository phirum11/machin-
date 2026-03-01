import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSun, FiMoon, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import CartSidebar from '../components/cart/CartSidebar';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cart, getCartCount, removeFromCart, updateQuantity } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ShopHub
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Products
              </Link>
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Dashboard
              </Link>
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 gap-2 w-64">
              <FiSearch className="text-gray-400 w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-gray-200 placeholder-gray-400"
              />
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FiHeart className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open cart"
              >
                <FiShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <Link to="/" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/products" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Products</Link>
              <Link to="/dashboard" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 gap-2">
                <FiSearch className="text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-gray-200 placeholder-gray-400"
                />
              </form>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">ShopHub</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/products" className="hover:text-blue-600">Products</Link>
              <Link to="/cart" className="hover:text-blue-600">Cart</Link>
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); navigate('/checkout'); }}
      />
    </div>
  );
};

export default MainLayout;
