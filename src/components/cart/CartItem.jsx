import React from 'react';
import { FiTrash2, FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  onToggleWishlist,
  isWishlisted = false
}) => {
  const { id, name, price, quantity, image, maxQuantity = 10 } = item;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex gap-5 p-5">
        {/* Product Image */}
        <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          <img
            src={image || 'https://via.placeholder.com/112'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-gray-800 truncate">
                {name}
              </h3>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                {formatCurrency(price)}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(id)}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isWishlisted
                      ? 'text-red-500 bg-red-50 hover:bg-red-100'
                      : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
                  }`}
                  aria-label={
                    isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
                  }
                >
                  <FiHeart
                    className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
              )}
              <button
                onClick={() => onRemove(id)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 rounded-xl"
                aria-label="Remove item"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quantity + Subtotal row */}
          <div className="flex items-center justify-between mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-600"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() =>
                  onUpdateQuantity(id, Math.min(maxQuantity, quantity + 1))
                }
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-600"
                disabled={quantity >= maxQuantity}
                aria-label="Increase quantity"
              >
                <FiPlus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Subtotal
              </span>
              <p className="text-base font-bold text-gray-900">
                {formatCurrency(price * quantity)}
              </p>
            </div>
          </div>

          {/* Stock indicator */}
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              In stock ({maxQuantity})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
