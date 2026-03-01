import React from 'react';
import { FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils/formatCurrency';

const CartSidebar = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiShoppingBag className="w-6 h-6 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout
            </p>
            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
            >
              Checkout
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;