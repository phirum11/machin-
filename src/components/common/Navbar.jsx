import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiSearch,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiShoppingCart,
  FiHeart,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiPackage,
  FiGlobe,
  FiGrid,
  FiStar,
  FiTruck,
  FiGift,
  FiTag,
  FiZap,
  FiTrash2,
  FiHome,
  FiBook,
  FiActivity,
  FiAward,
  FiCpu,
  FiTarget,
  FiFeather,
  FiPhone,
  FiArrowLeft,
  FiUser
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useProducts } from '../../context/ProductContext';
import useAuth from '../../hooks/useAuth';
import useDebounce from '../../hooks/useDebounce';

/* ── MEGA-MENU CATEGORIES ───────────────────────────────────────── */
const megaCategories = [
  {
    name: 'Electronics',
    icon: FiCpu,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    subs: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'TVs']
  },
  {
    name: 'Furniture',
    icon: FiHome,
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    subs: ['Chairs', 'Tables', 'Shelves', 'Beds', 'Desks']
  },
  {
    name: 'Accessories',
    icon: FiFeather,
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-500/10',
    subs: ['Bags', 'Wallets', 'Watches', 'Belts', 'Sunglasses']
  },
  {
    name: 'Home & Kitchen',
    icon: FiGrid,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-500/10',
    subs: ['Cookware', 'Appliances', 'Storage', 'Decor', 'Lighting']
  },
  {
    name: 'Sports & Fitness',
    icon: FiActivity,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-500/10',
    subs: ['Yoga', 'Running', 'Weights', 'Cycling', 'Nutrition']
  },
  {
    name: 'Outdoors',
    icon: FiTarget,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    subs: ['Camping', 'Hiking', 'Fishing', 'Climbing', 'Garden']
  },
  {
    name: 'Pets',
    icon: FiAward,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    subs: ['Dog', 'Cat', 'Fish', 'Birds', 'Grooming']
  },
  {
    name: 'Education',
    icon: FiBook,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    subs: ['Books', 'Stationery', 'Art Supplies', 'STEM Kits', 'Planners']
  }
];

/* ── NOTIFICATION STYLES ────────────────────────────────────────── */
const notifTypeStyles = {
  order: {
    border: 'border-l-blue-500',
    icon: FiPackage,
    iconColor: 'text-blue-500'
  },
  deal: { border: 'border-l-red-500', icon: FiZap, iconColor: 'text-red-500' },
  wishlist: {
    border: 'border-l-pink-500',
    icon: FiHeart,
    iconColor: 'text-pink-500'
  },
  loyalty: {
    border: 'border-l-yellow-500',
    icon: FiStar,
    iconColor: 'text-yellow-500'
  }
};

/* ── ANIMATED BADGE ─────────────────────────────────────────────── */
const AnimatedBadge = ({ count, className = '' }) => {
  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(count);
  useEffect(() => {
    if (count !== prevCount.current) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 300);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
  }, [count]);
  if (!count || count <= 0) return null;
  return (
    <span
      className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold rounded-full shadow-sm transition-transform ${bounce ? 'scale-125' : 'scale-100'} ${className}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

/* ── CLICK OUTSIDE ──────────────────────────────────────────────── */
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

/* ════════════════════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════════════════════ */
const Navbar = ({ onCartOpen, onLoginOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount, wishlist, toggleWishlist } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { allProducts } = useProducts();
  const { user, isAuthenticated, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileWishlistOpen, setMobileWishlistOpen] = useState(false);
  const [mobileNotifOpen, setMobileNotifOpen] = useState(false);


  const megaRef = useRef(null);
  const notifRef = useRef(null);
  const userRef = useRef(null);
  const megaTimeout = useRef(null);
  const wishlistRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useClickOutside(megaRef, () => setMegaOpen(false));
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(userRef, () => setUserMenuOpen(false));
  useClickOutside(wishlistRef, () => setWishlistOpen(false));
  useClickOutside(searchRef, () => setSearchFocused(false));
  useClickOutside(mobileSearchRef, () => setSearchFocused(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const cartCount = getCartCount();
  const wishlistCount = wishlist?.length || 0;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const debouncedSearch = useDebounce(searchQuery, 250);
  const searchResults = React.useMemo(() => {
    if (!debouncedSearch.trim() || !allProducts) return [];
    const q = debouncedSearch.toLowerCase();
    return allProducts
      .filter(
        (p) =>
          (p.name?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)) &&
          (searchCategory === 'All' || p.category === searchCategory)
      )
      .slice(0, 6);
  }, [debouncedSearch, allProducts, searchCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products?search=' + encodeURIComponent(searchQuery.trim()));
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const handleSearchResultClick = (productId) => {
    navigate('/product/' + productId);
    setSearchQuery('');
    setSearchFocused(false);
  };

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    megaTimeout.current = setTimeout(() => setMegaOpen(true), 150);
  };
  const handleMegaLeave = () => {
    clearTimeout(megaTimeout.current);
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const markNotifRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const wishlistProducts = (allProducts || []).filter((p) =>
    wishlist.includes(p.id)
  );
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/products', label: 'Products' },
    { to: '/order-tracking', label: 'Order Tracking' }
  ];

  // ═════ RENDER ═════════════════════════════════════════════════════
  return (
    <>
      <header
        className={
          'sticky top-2 z-40 mx-3 lg:mx-16 transition-all duration-300 border rounded-xl ' +
          (scrolled
            ? 'bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg shadow-black/[0.04] dark:shadow-black/30 border-white/20 dark:border-gray-700/30'
            : 'bg-white/50 dark:bg-gray-900/60 backdrop-blur-xl border-white/10 dark:border-gray-700/20')
        }
        style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}
      >
        {/* ═══ MAIN NAV ROW ══════════════════════════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="flex items-center h-16 gap-2 lg:gap-5">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0 group mr-2 lg:mr-0"
            >
              <span className="w-9 h-9 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-xl flex items-center justify-center text-sm font-extrabold shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all group-hover:scale-105">
                AP
              </span>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[17px] font-extrabold tracking-tight bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                  AP Electronic
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
                  Store
                </span>
              </div>
            </Link>

            {/* Categories mega-menu */}
            <div
              ref={megaRef}
              className="hidden lg:block relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className={
                  'flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold transition-all ' +
                  (megaOpen
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-500/25'
                    : 'bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/80 border border-gray-200/80 dark:border-gray-700/60')
                }
              >
                <FiGrid size={15} />
                Categories
                <FiChevronDown
                  size={13}
                  className={
                    'transition-transform duration-200 ' +
                    (megaOpen ? 'rotate-180' : '')
                  }
                />
              </button>

              {/* Mega Panel */}
              <div
                className={
                  'absolute top-full left-0 mt-3 w-[680px] bg-white/80 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-white/30 dark:border-gray-700/40 p-5 transition-all duration-200 origin-top-left ' +
                  (megaOpen
                    ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                    : 'opacity-0 scale-[0.97] pointer-events-none -translate-y-2')
                }
              >
                <div className="grid grid-cols-4 gap-1">
                  {megaCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={'/products?category=' + encodeURIComponent(cat.name)}
                      onClick={() => setMegaOpen(false)}
                      className="group/cat p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all"
                    >
                      <div
                        className={
                          'w-9 h-9 ' +
                          cat.bg +
                          ' rounded-xl flex items-center justify-center mb-2 group-hover/cat:scale-110 transition-transform'
                        }
                      >
                        <cat.icon size={17} className={cat.color} />
                      </div>
                      <h4 className="text-[13px] font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover/cat:text-[#4F46E5] transition-colors">
                        {cat.name}
                      </h4>
                      <ul className="space-y-0.5">
                        {cat.subs.slice(0, 3).map((sub) => (
                          <li
                            key={sub}
                            className="text-[11px] text-gray-400 dark:text-gray-500 hover:text-[#4F46E5] transition-colors flex items-center gap-1"
                          >
                            <FiChevronRight size={9} /> {sub}
                          </li>
                        ))}
                        <li className="text-[11px] text-[#4F46E5] font-medium mt-1">
                          +{cat.subs.length - 3} more
                        </li>
                      </ul>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={
                    'px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ' +
                    (isActive(link.to)
                      ? 'text-[#4F46E5] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60')
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Search Bar ─────────────────────────────────────── */}
            <div
              ref={searchRef}
              className="hidden md:flex flex-1 max-w-lg ml-auto lg:ml-4 relative"
            >
              <form onSubmit={handleSearch} className="flex w-full">
                <div
                  className={
                    'flex w-full items-center h-10 rounded-xl overflow-hidden transition-all duration-200 ' +
                    (searchFocused
                      ? 'bg-white dark:bg-gray-800 ring-2 ring-[#4F46E5] shadow-lg shadow-indigo-500/10'
                      : 'bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-700/60 hover:ring-gray-300 dark:hover:ring-gray-600')
                  }
                >
                  <FiSearch
                    size={15}
                    className="ml-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search products..."
                    className="flex-1 h-full px-3 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchFocused(false);
                      }}
                      className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="h-full px-2 text-[11px] font-semibold text-gray-400 dark:text-gray-500 bg-transparent border-l border-gray-200 dark:border-gray-700/60 outline-none cursor-pointer hover:text-gray-600 transition-colors"
                  >
                    <option>All</option>
                    {megaCategories.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/80 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-white/30 dark:border-gray-700/40 overflow-hidden z-50">
                  {searchResults.length === 0 ? (
                    <div className="py-8 px-4 text-center">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiSearch
                          className="text-gray-300 dark:text-gray-600"
                          size={20}
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        No products found
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Try a different keyword
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-2.5 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Products
                        </span>
                        <span className="text-[10px] font-bold text-[#4F46E5] bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">
                          {searchResults.length} found
                        </span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSearchResultClick(product.id)}
                            className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group"
                          >
                            <img
                              src={
                                product.image ||
                                'https://via.placeholder.com/60'
                              }
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700 group-hover:ring-[#4F46E5]/30 transition-all flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-[#4F46E5] transition-colors">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-bold text-[#4F46E5]">
                                  ${product.price}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-[10px] text-gray-400 line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                                <span className="text-[10px] text-gray-400">
                                  · {product.category}
                                </span>
                              </div>
                            </div>
                            <FiChevronRight
                              size={14}
                              className="text-gray-300 group-hover:text-[#4F46E5] flex-shrink-0 transition-colors"
                            />
                          </button>
                        ))}
                      </div>
                      <div className="px-4 py-2.5 border-t border-gray-50 dark:border-gray-800">
                        <button
                          onClick={handleSearch}
                          className="w-full text-center text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
                        >
                          View all results for &ldquo;{searchQuery}&rdquo;
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ══ RIGHT ACTIONS ══════════════════════════════════════ */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              {/* Mobile Search Icon */}
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all active:scale-90"
                aria-label="Toggle theme"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {/* Divider */}
              <span className="hidden lg:block w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

              {/* Notifications */}
              <div ref={notifRef} className="relative hidden sm:block">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                  aria-label="Notifications"
                >
                  <FiBell size={18} />
                  <AnimatedBadge
                    count={unreadNotifs}
                    className="bg-red-500 text-white"
                  />
                </button>

                {/* Notification Dropdown */}
                <div
                  className={
                    'absolute top-full right-0 mt-3 w-80 bg-white/80 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-white/30 dark:border-gray-700/40 transition-all duration-200 origin-top-right overflow-hidden ' +
                    (notifOpen
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none')
                  }
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">
                      Notifications
                    </h3>
                    {unreadNotifs > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-[#4F46E5] hover:text-[#4338CA] font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-10 px-4 text-center">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiBell
                            className="text-gray-300 dark:text-gray-600"
                            size={20}
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
                          All caught up!
                        </p>
                        <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5">
                          No new notifications
                        </p>
                      </div>
                    ) : (
                      notifications.map((n) => {
                        const style =
                          notifTypeStyles[n.type] || notifTypeStyles.order;
                        const TypeIcon = style.icon;
                        return (
                          <button
                            key={n.id}
                            onClick={() => markNotifRead(n.id)}
                            className={
                              'w-full text-left px-4 py-3 border-l-[3px] ' +
                              style.border +
                              ' hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-start gap-3 ' +
                              (!n.read
                                ? 'bg-indigo-50/40 dark:bg-indigo-500/5'
                                : '')
                            }
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <TypeIcon size={14} className={style.iconColor} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={
                                  'text-sm font-semibold truncate ' +
                                  (!n.read
                                    ? 'text-gray-900 dark:text-gray-100'
                                    : 'text-gray-600 dark:text-gray-400')
                                }
                              >
                                {n.title}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                                {n.desc}
                              </p>
                              <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-0.5">
                                {n.time}
                              </p>
                            </div>
                            {!n.read && (
                              <span className="w-2 h-2 bg-[#4F46E5] rounded-full flex-shrink-0 mt-2" />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <div ref={wishlistRef} className="relative hidden sm:block">
                <button
                  onClick={() => setWishlistOpen(!wishlistOpen)}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                  aria-label="Wishlist"
                >
                  <FiHeart size={18} />
                  <AnimatedBadge
                    count={wishlistCount}
                    className="bg-pink-500 text-white"
                  />
                </button>

                {/* Wishlist Dropdown */}
                <div
                  className={
                    'absolute top-full right-0 mt-3 w-[340px] bg-white/80 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-white/30 dark:border-gray-700/40 transition-all duration-200 origin-top-right overflow-hidden z-50 ' +
                    (wishlistOpen
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none')
                  }
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-500/5 dark:to-rose-500/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiHeart className="text-pink-500" size={15} />
                      <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">
                        Wishlist
                      </h3>
                      <span className="text-[10px] font-bold bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
                        {wishlistProducts.length}
                      </span>
                    </div>
                    {wishlistProducts.length > 0 && (
                      <button
                        onClick={() => {
                          wishlistProducts.forEach((p) => toggleWishlist(p.id));
                          setWishlistOpen(false);
                        }}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {wishlistProducts.length === 0 ? (
                      <div className="py-10 px-4 text-center">
                        <div className="w-14 h-14 bg-pink-50 dark:bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiHeart
                            className="text-pink-300 dark:text-pink-500/40"
                            size={24}
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          Your wishlist is empty
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Tap the heart on products you love
                        </p>
                      </div>
                    ) : (
                      wishlistProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-b-0 group"
                        >
                          <Link
                            to={'/product/' + product.id}
                            onClick={() => setWishlistOpen(false)}
                            className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 ring-1 ring-gray-100 dark:ring-gray-700"
                          >
                            <img
                              src={
                                product.image ||
                                'https://via.placeholder.com/80'
                              }
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              to={'/product/' + product.id}
                              onClick={() => setWishlistOpen(false)}
                              className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate block hover:text-[#4F46E5] transition-colors"
                            >
                              {product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-300 hover:text-red-500 transition-all flex-shrink-0"
                            title="Remove"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  {wishlistProducts.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                      <Link
                        to="/products"
                        onClick={() => setWishlistOpen(false)}
                        className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl transition-all shadow-sm shadow-pink-500/20"
                      >
                        <FiHeart size={13} /> View All Wishlist Items
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={onCartOpen}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart size={18} />
                <AnimatedBadge
                  count={cartCount}
                  className="bg-[#4F46E5] text-white"
                />
              </button>

              {/* Divider */}
              <span className="hidden lg:block w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

              {/* User / Login */}
              {isAuthenticated ? (
                <div ref={userRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#4F46E5]/20"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <FiChevronDown
                      size={14}
                      className={
                        'hidden lg:block text-gray-400 transition-transform ' +
                        (userMenuOpen ? 'rotate-180' : '')
                      }
                    />
                  </button>

                  {/* User Dropdown */}
                  <div
                    className={
                      'absolute top-full right-0 mt-3 w-64 bg-white/80 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-white/30 dark:border-gray-700/40 transition-all duration-200 origin-top-right overflow-hidden ' +
                      (userMenuOpen
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none')
                    }
                  >
                    {/* User info */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-bold">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      {/* Loyalty */}
                    </div>

                    {/* Links */}
                    <div className="p-2">
                      {[
                        {
                          icon: FiPackage,
                          label: 'My Orders',
                          to: '/order-tracking'
                        },

                        {
                          icon: FiSettings,
                          label: 'Profile Settings',
                          to: '/dashboard'
                        }
                      ].map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                          <item.icon size={16} className="text-gray-400" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <FiLogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mobile - user icon */}
                  <button
                    onClick={onLoginOpen}
                    className="sm:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                    aria-label="Login"
                  >
                    <FiUser size={18} />
                  </button>
                  {/* Desktop - gradient button */}
                  <button
                    onClick={onLoginOpen}
                    className="hidden sm:flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.97]"
                  >
                    <FiLogIn size={15} />
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ═══ MOBILE SEARCH OVERLAY ═══════════════════════════════ */}
        {mobileSearchOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 animate-fade-in">
            <div className="flex items-center gap-2 px-4 h-14 border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => {
                  setMobileSearchOpen(false);
                  setSearchQuery('');
                  setSearchFocused(false);
                }}
                className="p-2 -ml-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Close search"
              >
                <FiArrowLeft size={20} />
              </button>
              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  setMobileSearchOpen(false);
                }}
                className="flex-1"
              >
                <div className="flex items-center h-10 bg-gray-50 dark:bg-gray-800/60 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700/60 focus-within:ring-2 focus-within:ring-[#4F46E5] focus-within:bg-white dark:focus-within:bg-gray-800 transition-all">
                  <FiSearch
                    size={15}
                    className="ml-3 text-gray-400 flex-shrink-0"
                  />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search products..."
                    className="flex-1 px-3 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Mobile search results */}
            <div
              className="overflow-y-auto bg-white dark:bg-gray-900"
              style={{ maxHeight: 'calc(100vh - 56px)' }}
            >
              {searchQuery.trim().length > 0 ? (
                searchResults.length === 0 ? (
                  <div className="py-16 px-4 text-center">
                    <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiSearch
                        className="text-gray-300 dark:text-gray-600"
                        size={22}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      No products found
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Try a different keyword
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        {searchResults.length} results
                      </span>
                    </div>
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          handleSearchResultClick(product.id);
                          setMobileSearchOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors border-b border-gray-100 dark:border-gray-800/50 last:border-b-0"
                      >
                        <img
                          src={
                            product.image || 'https://via.placeholder.com/60'
                          }
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-bold text-[#4F46E5]">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400">
                              · {product.category}
                            </span>
                          </div>
                        </div>
                        <FiChevronRight
                          size={14}
                          className="text-gray-300 flex-shrink-0"
                        />
                      </button>
                    ))}
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={(e) => {
                          handleSearch(e);
                          setMobileSearchOpen(false);
                        }}
                        className="w-full text-center text-xs font-bold text-[#4F46E5]"
                      >
                        View all results for &ldquo;{searchQuery}&rdquo;
                      </button>
                    </div>
                  </>
                )
              ) : (
                <div className="py-16 px-4 text-center">
                  <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiSearch
                      className="text-gray-300 dark:text-gray-600"
                      size={22}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Search for products
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Type to find what you're looking for
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ═══ MOBILE SLIDE MENU ══════════════════════════════════════ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white/80 dark:bg-gray-900/85 backdrop-blur-xl shadow-2xl overflow-y-auto animate-slide-in-left border-r border-white/20 dark:border-gray-700/30">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <span className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-lg flex items-center justify-center text-xs font-extrabold">
                  AP
                </span>
                <span className="font-extrabold text-[15px] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                  Electronic Store
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* User section */}
            {isAuthenticated && user && (
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-bold">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                      {user.name && user.email
                        ? `${user.name} ${user.email}`
                        : user.name || user.email}
                    </p>                   
                  </div>
                </div>
              </div>
            )}

            {/* Nav links */}
            <div className="p-3">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Navigation
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={
                    'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ' +
                    (isActive(link.to)
                      ? 'text-[#4F46E5] bg-indigo-50 dark:bg-indigo-500/10'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800')
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Categories */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {megaCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={'/products?category=' + encodeURIComponent(cat.name)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div
                      className={
                        'w-7 h-7 ' +
                        cat.bg +
                        ' rounded-lg flex items-center justify-center'
                      }
                    >
                      <cat.icon size={13} className={cat.color} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Quick Actions
              </p>
              <div className="flex items-center justify-around py-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => setMobileWishlistOpen(true), 150);
                  }}
                  className="relative flex flex-col items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-pink-500 transition-colors cursor-pointer"
                >
                  <FiHeart size={18} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 right-0 min-w-[14px] h-[14px] flex items-center justify-center text-[8px] font-bold rounded-full bg-pink-500 text-white">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold">Wishlist</span>
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => setMobileNotifOpen(true), 150);
                  }}
                  className="relative flex flex-col items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                >
                  <FiBell size={18} />
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-1 right-0 min-w-[14px] h-[14px] flex items-center justify-center text-[8px] font-bold rounded-full bg-red-500 text-white">
                      {unreadNotifs}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold">Alerts</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex flex-col items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                  <span className="text-[10px] font-semibold">Theme</span>
                </button>
              </div>
            </div>

            {/* Language / Currency */}

            {/* Login / Logout */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 transition-colors"
                >
                  <FiLogOut size={16} /> Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLoginOpen();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] shadow-lg shadow-indigo-500/20"
                >
                  <FiLogIn size={16} /> Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MOBILE WISHLIST PANEL ════════════════════════════════ */}
      {mobileWishlistOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileWishlistOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 max-h-[85vh] bg-white dark:bg-gray-900 rounded-b-3xl shadow-2xl animate-slide-down flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center">
                  <FiHeart className="text-pink-500" size={16} />
                </div>
                <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">
                  Wishlist
                </h3>
                <span className="text-[10px] font-bold bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
                  {wishlistProducts.length}
                </span>
              </div>
              <button
                onClick={() => setMobileWishlistOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiX size={20} className="text-gray-500" />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {wishlistProducts.length === 0 ? (
                <div className="py-16 px-4 text-center">
                  <div className="w-16 h-16 bg-pink-50 dark:bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiHeart
                      className="text-pink-300 dark:text-pink-500/40"
                      size={28}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Your wishlist is empty
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Tap the heart on products you love
                  </p>
                  <Link
                    to="/products"
                    onClick={() => setMobileWishlistOpen(false)}
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-md shadow-pink-500/20"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800/50 last:border-b-0 active:bg-gray-50 dark:active:bg-gray-800/40 transition-colors"
                  >
                    <Link
                      to={'/product/' + product.id}
                      onClick={() => setMobileWishlistOpen(false)}
                      className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 ring-1 ring-gray-100 dark:ring-gray-700"
                    >
                      <img
                        src={product.image || 'https://via.placeholder.com/80'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={'/product/' + product.id}
                        onClick={() => setMobileWishlistOpen(false)}
                        className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate block"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {wishlistProducts.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/products"
                  onClick={() => setMobileWishlistOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-md shadow-pink-500/20"
                >
                  <FiHeart size={15} /> View All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ MOBILE NOTIFICATIONS PANEL ════════════════════════════ */}
      {mobileNotifOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileNotifOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 max-h-[85vh] bg-white dark:bg-gray-900 rounded-b-3xl shadow-2xl animate-slide-down flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                  <FiBell className="text-blue-500" size={16} />
                </div>
                <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">
                  Notifications
                </h3>
                {unreadNotifs > 0 && (
                  <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                    {unreadNotifs}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadNotifs > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#4F46E5] hover:text-[#4338CA] font-semibold px-2 py-1"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setMobileNotifOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-16 px-4 text-center">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiBell
                      className="text-blue-300 dark:text-blue-500/40"
                      size={28}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    All caught up!
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    No new notifications
                  </p>
                </div>
              ) : (
                notifications.map((n) => {
                  const style =
                    notifTypeStyles[n.type] || notifTypeStyles.order;
                  const TypeIcon = style.icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => markNotifRead(n.id)}
                      className={
                        'w-full text-left px-5 py-3.5 border-l-[3px] ' +
                        style.border +
                        ' active:bg-gray-50 dark:active:bg-gray-800/60 transition-colors flex items-start gap-3 border-b border-b-gray-50 dark:border-b-gray-800/50 ' +
                        (!n.read ? 'bg-indigo-50/40 dark:bg-indigo-500/5' : '')
                      }
                    >
                      <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <TypeIcon size={15} className={style.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={
                            'text-sm font-semibold ' +
                            (!n.read
                              ? 'text-gray-900 dark:text-gray-100'
                              : 'text-gray-600 dark:text-gray-400')
                          }
                        >
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {n.desc}
                        </p>
                        <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-1">
                          {n.time}
                        </p>
                      </div>
                      {!n.read && (
                        <span className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full flex-shrink-0 mt-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide animation */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
