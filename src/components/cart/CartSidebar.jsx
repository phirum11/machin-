import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiX,
  FiShoppingBag,
  FiArrowRight,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiPackage
} from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 100;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[440px] bg-white/80 dark:bg-gray-800/85 backdrop-blur-xl shadow-2xl z-50 flex flex-col border-l border-white/20 dark:border-gray-700/30"
          >
            {/* Header */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="relative px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FiShoppingBag className="w-5 h-5 text-white" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Shopping Cart
                    </h2>
                    <p className="text-blue-100 text-xs">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
                  aria-label="Close cart"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Free shipping progress */}
            {cart.length > 0 && (
              <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                {remainingForFree > 0 ? (
                  <>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-blue-700 font-medium flex items-center gap-1">
                        <FiPackage size={12} />
                        Add {formatCurrency(remainingForFree)} for free shipping
                      </span>
                      <span className="text-blue-500 font-semibold">
                        {Math.round((subtotal / freeShippingThreshold) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-green-700 text-xs font-semibold flex items-center gap-1.5">
                    <span className="text-green-500">&#10003;</span>
                    You qualify for free shipping!
                  </p>
                )}
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                    <FiShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-1">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    Start adding products to your cart
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="px-4 py-4 space-y-3">
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 80, height: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                      >
                        <div className="flex gap-4 p-4">
                          {/* Image */}
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                            <img
                              src={
                                item.image || 'https://via.placeholder.com/80'
                              }
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 truncate pr-6">
                              {item.name}
                            </h4>
                            <p className="text-lg font-bold text-gray-900 mt-0.5">
                              {formatCurrency(item.price)}
                            </p>

                            {/* Quantity + Actions row */}
                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity controls */}
                              <div className="flex items-center gap-0 bg-gray-100 rounded-xl overflow-hidden">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 transition-colors"
                                >
                                  <FiMinus size={14} />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                  <FiPlus size={14} />
                                </button>
                              </div>

                              {/* Item total + remove */}
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-indigo-600">
                                  {formatCurrency(item.price * item.quantity)}
                                </span>
                                <button
                                  onClick={() => onRemove(item.id)}
                                  className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                  aria-label="Remove item"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <p className="text-xs text-gray-400">
                      Shipping & tax at checkout
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
