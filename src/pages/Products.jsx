import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import useAuth from '../hooks/useAuth';
import LoginModal from '../components/auth/LoginModal';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import MainLayout from '../layout/MainLayout';
import { ScrollReveal } from '../hooks/useScrollReveal';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    products,
    categories,
    filters,
    sortBy,
    sortOrder,
    loading,
    setFilter,
    setSort,
    resetFilters
  } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    addToCart(product);
  };

  // Sync URL search params to filters on mount
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    if (search) setFilter({ search });
    if (category) setFilter({ category });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal animation="fade-up">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Products
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {products.length} products found
            </p>
          </div>
        </ScrollReveal>

        <div className="flex gap-8">
          {/* Filters */}
          <ProductFilter
            filters={filters}
            categories={categories}
            onFilterChange={(newFilters) => {
              Object.entries(newFilters).forEach(([key, val]) =>
                setFilter({ [key]: val })
              );
            }}
          />

          {/* Product list */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <ProductSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={({ sortBy: sb, sortOrder: so }) =>
                  setSort(sb, so)
                }
              />
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Reset filters
              </button>
            </div>

            <ProductGrid
              products={products}
              loading={loading}
              onAddToCart={handleAddToCart}
              onToggleWishlist={toggleWishlist}
              onViewDetails={(id) => navigate(`/product/${id}`)}
              isInWishlist={isInWishlist}
            />
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </MainLayout>
  );
};

export default Products;
