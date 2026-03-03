import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiTwitter
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';
import CartSidebar from '../components/cart/CartSidebar';
import LoginModal from '../components/auth/LoginModal';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        onCartOpen={() => setIsCartOpen(true)}
        onLoginOpen={() => setShowLoginModal(true)}
      />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Brand + Newsletter row on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-0 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-gray-200/60 dark:border-gray-700/40">
            <div className="flex-1">
              <Link
                to="/"
                className="flex items-center gap-2.5 font-bold text-xl text-blue-600 dark:text-blue-400 mb-3"
              >
                <span className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-500/20">
                  AP
                </span>
                Electronic Store
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                Premium electronics at unbeatable prices. Your one-stop shop for
                the latest tech.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-4">
                {[
                  { icon: FiFacebook, label: 'Facebook' },
                  { icon: FiInstagram, label: 'Instagram' },
                  { icon: FiTwitter, label: 'Twitter' }
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Links grid — 2 cols on mobile, 3 cols on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'Products' },
                  { to: '/cart', label: 'Cart' },
                  { to: '/dashboard', label: 'Dashboard' }
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <FiArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wider">
                Customer Service
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Shipping Policy
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Returns & Exchanges
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  FAQ
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1 mt-2 md:mt-0">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wider">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:ponphirum@gmail.com"
                    className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-4 h-4 text-blue-500" />
                    </span>
                    ponphirum@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+85596794153"
                    className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-4 h-4 text-blue-500" />
                    </span>
                    +855 96 79 45 153
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-4 h-4 text-blue-500" />
                  </span>
                  Phnom Penh, Cambodia
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} AccountPro Electronic Store. All
            rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/checkout');
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default MainLayout;
