import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';

const FEATURES = [
  { icon: <FiTruck className="w-8 h-8" />, title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: <FiShield className="w-8 h-8" />, title: 'Secure Payment', desc: '100% secure transactions' },
  { icon: <FiRefreshCw className="w-8 h-8" />, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: <FiShoppingBag className="w-8 h-8" />, title: 'Best Deals', desc: 'Price match guarantee' },
];

const Home = () => {
  const navigate = useNavigate();
  const { allProducts } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist, wishlist } = useCart();

  const featured = allProducts.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden mb-12 text-white">
        <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Shop the latest trends with unbeatable prices and fast delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Shop Now <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/products?category=Electronics"
              className="inline-flex items-center gap-2 border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Electronics
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-800/40 to-transparent" />
      </section>

      {/* Features */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-blue-600 dark:text-blue-400 mb-3">{f.icon}</div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Featured Products</h2>
          <Link to="/products" className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1">
            View All <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              onViewDetails={(id) => navigate(`/product/${id}`)}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
