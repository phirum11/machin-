import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import { useScrollRevealMany } from '../../hooks/useScrollReveal';

const ITEMS_PER_PAGE = 12;

const ProductGrid = ({
  products = [],
  loading = false,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  isInWishlist
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const sentinelRef = useRef(null);
  const gridRef = useScrollRevealMany({ stagger: 80, threshold: 0.05 });

  // Reset visible count when products change (filter/sort)
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [products]);

  // Infinite scroll via IntersectionObserver
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, products.length));
  }, [products.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  if (loading) {
    return <Loader size="lg" className="py-20" />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-400 mb-2">No products found</p>
        <p className="text-gray-500">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <>
      <div
        ref={gridRef}
        data-scroll-children
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onViewDetails={onViewDetails}
            isWishlisted={isInWishlist?.(product.id)}
          />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading more products…
          </div>
        </div>
      )}

      {!hasMore && products.length > ITEMS_PER_PAGE && (
        <p className="text-center text-gray-400 text-sm py-6">
          Showing all {products.length} products
        </p>
      )}
    </>
  );
};

export default ProductGrid;
