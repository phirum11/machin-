import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { calculateSubtotal, calculateShipping, calculateTax } from '../utils/calculateTotal';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import MainLayout from '../layout/MainLayout';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, toggleWishlist, isInWishlist } = useCart();

  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <FiShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
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
                onCheckout={() => navigate('/checkout')}
                onContinueShopping={() => navigate('/products')}
                isCheckoutDisabled={cart.length === 0}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
