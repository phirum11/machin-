import React from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products = [], loading = false, onAddToCart, onToggleWishlist, onViewDetails, isInWishlist }) => {
  if (loading) {
    return <Loader size="lg" className="py-20" />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-400 mb-2">No products found</p>
        <p className="text-gray-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map(product => (
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
  );
};

export default ProductGrid;
