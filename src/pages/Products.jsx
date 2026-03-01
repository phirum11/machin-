import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import useDebounce from '../hooks/useDebounce';

const Products = () => {
  const { products, categories, filters, sortBy, sortOrder, loading, setFilter, setSort, resetFilters } = useProducts();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setFilter({ search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleFilterChange = (newFilters) => {
    setFilter(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">{products.length} products found</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="flex gap-8">
        {/* Filters */}
        <ProductFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <ProductSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={({ sortBy: sb, sortOrder: so }) => setSort(sb, so)}
            />
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset filters
            </button>
          </div>

          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlisted={wishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
