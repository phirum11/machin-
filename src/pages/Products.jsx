import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import MainLayout from '../layout/MainLayout';

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
    resetFilters,
  } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">{products.length} products found</p>
        </div>

        <div className="flex gap-8">
          {/* Filters */}
          <ProductFilter
            filters={filters}
            categories={categories}
            onFilterChange={(newFilters) => {
              Object.entries(newFilters).forEach(([key, val]) => setFilter({ [key]: val }));
            }}
          />

          {/* Product list */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <ProductSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={({ sortBy: sb, sortOrder: so }) => setSort(sb, so)}
              />
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset filters
              </button>
            </div>

            <ProductGrid
              products={products}
              loading={loading}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              onViewDetails={(id) => navigate(`/product/${id}`)}
              isInWishlist={isInWishlist}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
