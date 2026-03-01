import React from 'react';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import RatingStars from '../common/RatingStars';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  onViewDetails,
  isWishlisted = false 
}) => {
  const { id, name, price, originalPrice, image, rating, reviews, discount } = product;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image || 'https://via.placeholder.com/300'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onViewDetails?.(id)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <FiEye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onToggleWishlist(id)}
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors ${
              isWishlisted ? 'text-red-500' : ''
            }`}
            aria-label="Add to wishlist"
          >
            <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category/ Brand */}
        <p className="text-xs text-gray-500 mb-1">{product.category || 'Category'}</p>
        
        {/* Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <a href={`/product/${id}`}>{name}</a>
        </h3>

        {/* Rating */}
        <div className="mb-3">
          <RatingStars rating={rating || 4.5} size="sm" />
          <span className="text-xs text-gray-500 ml-2">({reviews || 0} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart?.(product)}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Status */}
        <p className={`text-xs mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;