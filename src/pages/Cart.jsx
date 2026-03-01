import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { calculateTotal } from '../utils/calculateTotal';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isInWishlist, wishlist, coupon } = useCart();

  const { subtotal, shipping, tax, discount } = calculateTotal(cart, coupon);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <FiShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={wishlist.includes(item.id)}
            />
          ))}
        </div>

        {/* Summary */}
        <div>
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            onCheckout={() => navigate('/checkout')}
            onContinueShopping={() => navigate('/products')}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
