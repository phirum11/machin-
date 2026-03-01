import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products, categories, filters, sortBy, sortOrder, loading, setFilter, setSort, resetFilters } = useProducts();
  const { addToCart, toggleWishlist, wishlist } = useCart();

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    if (search) setFilter({ search });
    if (category) setFilter({ category });
  }, [searchParams]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Products</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductFilter
            filters={filters}
            onFilterChange={(f) => setFilter(f)}
            categories={categories}
            onReset={resetFilters}
          />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
            <ProductSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(sb, so) => setSort(sb, so)}
            />
          </div>
          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            onViewDetails={(id) => navigate(`/product/${id}`)}
            wishlist={wishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
