import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import MainLayout from '../layout/MainLayout';

const features = [
  { icon: FiTruck, title: 'Free Shipping', description: 'On orders over $100' },
  { icon: FiRefreshCw, title: 'Easy Returns', description: '30-day return policy' },
  { icon: FiShield, title: 'Secure Payment', description: '100% secure checkout' },
  { icon: FiHeadphones, title: '24/7 Support', description: 'Always here to help' },
];

const Home = () => {
  const navigate = useNavigate();
  const { allProducts, categories } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const featured = allProducts.filter(p => p.rating >= 4.7).slice(0, 4);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shop Smarter, <span className="text-yellow-300">Live Better</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Discover premium products at unbeatable prices. Free shipping on orders over $100.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Shop Now <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
            <div key={feature.title} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <FeatureIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="px-5 py-2 bg-white border border-gray-200 rounded-full font-medium text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              onViewDetails={(id) => navigate(`/product/${id}`)}
              isWishlisted={isInWishlist(product.id)}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
