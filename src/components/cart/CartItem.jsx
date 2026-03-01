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
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
        <img 
          src={image || 'https://via.placeholder.com/96'} 
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {formatCurrency(price)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            In stock: {maxQuantity}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <button
            onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, Math.min(maxQuantity, quantity + 1))}
            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Subtotal & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="text-right">
            <span className="text-sm text-gray-500">Subtotal:</span>
            <p className="font-semibold text-gray-900">
              {formatCurrency(price * quantity)}
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleWishlist(id)}
              className={`p-2 rounded-full transition-colors ${
                isWishlisted 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onRemove(id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full"
              aria-label="Remove item"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;