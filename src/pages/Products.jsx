import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import ProductGrid from '../components/product/ProductGrid';

const Products = () => {
  const { products, allProducts, categories, filters, sortBy, sortOrder, setFilter, setSort, resetFilters } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">All Products</h1>
        <p className="text-gray-500">
          Showing <span className="font-semibold text-gray-700">{products.length}</span> of{' '}
          <span className="font-semibold text-gray-700">{allProducts.length}</span> products
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters */}
        <ProductFilter
          filters={filters}
          onFilterChange={setFilter}
          categories={categories}
        />

        {/* Products area */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <span className="text-sm text-gray-500 hidden sm:block">
              {products.length} result{products.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-3">
              <ProductSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={({ sortBy: sb, sortOrder: so }) => setSort(sb, so)}
              />
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Grid */}
          <ProductGrid
            products={products}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            onViewDetails={(id) => navigate(`/products/${id}`)}
            isWishlisted={isInWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
