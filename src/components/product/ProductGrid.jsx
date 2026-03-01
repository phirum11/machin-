import React from 'react';
import ProductCard from './ProductCard';
import { FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products = [], onAddToCart, onToggleWishlist, onViewDetails, isWishlisted }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-400 mb-6">Try adjusting your filters or search term.</p>
        <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">Browse all products</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onViewDetails={onViewDetails}
          isWishlisted={typeof isWishlisted === 'function' ? isWishlisted(product.id) : isWishlisted}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
