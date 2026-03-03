import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import RatingStars from '../common/RatingStars';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  isWishlisted = false
}) => {
  const { id, name, price, originalPrice, image, rating, reviews, discount } =
    product;
  const { getProductRating } = useCart();
  const { avgRating, totalReviews } = getProductRating(id, rating, reviews);

  return (
    <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={image || 'https://via.placeholder.com/300'}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg shadow-red-500/25">
              -{discount}%
            </span>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg shadow-amber-500/25">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist button - always visible */}
        <button
          onClick={() => onToggleWishlist(id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
            isWishlisted
              ? 'bg-red-500 text-white shadow-red-500/30'
              : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:bg-red-500 hover:text-white hover:shadow-red-500/30'
          }`}
          aria-label="Toggle wishlist"
        >
          <FiHeart
            className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
          />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
          <button
            onClick={() => onViewDetails?.(id)}
            className="px-5 py-2 bg-white/95 backdrop-blur-sm rounded-xl text-sm font-semibold text-gray-800 hover:bg-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2 shadow-lg"
          >
            <FiEye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-1.5">
          {product.category || 'Category'}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <RatingStars rating={avgRating || 4.5} size="sm" showValue={false} />
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            ({avgRating.toFixed(1)})
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            ({totalReviews.toLocaleString()})
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-400 dark:text-gray-500 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart?.(product)}
            disabled={product.stock === 0}
            className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Status */}
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <p
            className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
          >
            {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
