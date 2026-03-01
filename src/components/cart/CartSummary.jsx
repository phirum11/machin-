import React, { useState } from 'react';
import { FiShoppingBag, FiTruck, FiPercent, FiShield, FiArrowRight } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const CartSummary = ({ 
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  onCheckout,
  onContinueShopping,
  isCheckoutDisabled = false
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const total = subtotal + shipping + tax - discount;
  const freeShippingThreshold = 100;
  const remainingForFreeShipping = subtotal < freeShippingThreshold 
    ? freeShippingThreshold - subtotal 
    : 0;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      setCouponCode('');
      alert('Coupon applied successfully!');
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FiShoppingBag className="w-5 h-5" />
        Order Summary
      </h2>

      {/* Free Shipping Progress */}
      {subtotal < freeShippingThreshold && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
            <FiTruck className="w-4 h-4" />
            <span>Add {formatCurrency(remainingForFreeShipping)} more for free shipping!</span>
          </div>
          <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="font-medium">{formatCurrency(shipping)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-{formatCurrency(discount)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Coupon Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            disabled={isApplyingCoupon}
          />
          <button
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || isApplyingCoupon}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
          >
            {isApplyingCoupon ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiPercent className="w-4 h-4" />
            )}
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isCheckoutDisabled}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group mb-3"
      >
        Proceed to Checkout
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <button
        onClick={onContinueShopping}
        className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
      >
        Continue Shopping
      </button>

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <FiShield className="w-4 h-4" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-2xl">
          <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-default">💳</span>
          <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-default">📱</span>
          <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-default">🏦</span>
          <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-default">🅿️</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;