import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { calculateTotal } from '../utils/calculateTotal';
import { SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from '../utils/constants';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, toggleWishlist, isInWishlist, coupon, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingRate = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const { tax, discount, shipping } = calculateTotal(cart, coupon, shippingRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <FiShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <FiShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear cart
              </button>
            </div>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={isInWishlist(item.id)}
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
      )}
    </div>
  );
};

export default Cart;
