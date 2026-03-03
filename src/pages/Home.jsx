import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiStar
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import MainLayout from '../layout/MainLayout';
import { ScrollReveal, useScrollRevealMany } from '../hooks/useScrollReveal';

const features = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    description: 'On orders over $100',
    color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
    color:
      'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: '100% secure checkout',
    color:
      'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Always here to help',
    color:
      'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { allProducts } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const featured = allProducts.filter((p) => p.rating >= 4.7).slice(0, 4);

  // IntersectionObserver for staggered grid children
  const featuresGridRef = useScrollRevealMany({ stagger: 100 });

  const productsGridRef = useScrollRevealMany({ stagger: 120 });

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative text-white py-28 px-4 overflow-hidden mt-2">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://img.freepik.com/free-photo/3d-rendering-hexagonal-texture-background_23-2150796440.jpg?semt=ais_rp_progressive&w=740&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/80 to-purple-900/85" />
        </div>
        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <FiStar className="w-4 h-4 text-yellow-300" />
            <span>Top rated electronics store</span>
          </div> 
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in-up stagger-1 leading-tight">
            Shop Smarter,{' '} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Live Better
            </span>  
          </h1>   
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Discover premium products at unbeatable prices. Free shipping on
            orders over $100.   
          </p>   
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link   
              to="/products"  
              className ="px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all hover:shadow-lg hover:shadow-white/25 flex items-center gap-2 group"
            >   
              Shop Now{' '}  
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          ref={featuresGridRef}
          data-scroll-children
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-3`}
                >
                  <FeatureIcon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 group"
            >
              View All{' '}
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
        <div
          ref={productsGridRef}
          data-scroll-children
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((product) => (
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
