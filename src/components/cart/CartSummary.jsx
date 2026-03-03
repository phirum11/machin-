import React, { useState } from 'react';
import {
  FiShoppingBag,
  FiTruck,
  FiPercent,
  FiShield,
  FiArrowRight,
  FiGift,
  FiCheckCircle
} from 'react-icons/fi';
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
  const remainingForFreeShipping =
    subtotal < freeShippingThreshold ? freeShippingThreshold - subtotal : 0;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setTimeout(() => {
      setIsApplyingCoupon(false);
      setCouponCode('');
      alert('Coupon applied successfully!');
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FiShoppingBag className="w-5 h-5" />
          Order Summary
        </h2>
      </div>

      <div className="p-6">
        {/* Free Shipping Progress */}
        {subtotal < freeShippingThreshold ? (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-blue-700 font-semibold flex items-center gap-1.5">
                <FiTruck className="w-3.5 h-3.5" />
                {formatCurrency(remainingForFreeShipping)} away from free
                shipping
              </span>
              <span className="text-blue-500 font-bold">
                {Math.round((subtotal / freeShippingThreshold) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(subtotal / freeShippingThreshold) * 100}%`
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-6 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2">
            <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-green-700 text-sm font-semibold">
              Free shipping unlocked!
            </span>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-semibold text-gray-800">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            {shipping === 0 ? (
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <FiTruck size={12} /> Free
              </span>
            ) : (
              <span className="font-semibold text-gray-800">
                {formatCurrency(shipping)}
              </span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax</span>
            <span className="font-semibold text-gray-800">
              {formatCurrency(tax)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600 flex items-center gap-1">
                <FiGift size={12} /> Discount
              </span>
              <span className="font-semibold text-green-600">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}

          <div className="border-t-2 border-dashed border-gray-100 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Coupon Input */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FiPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-100 rounded-xl focus:ring-0 focus:border-blue-500 outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                disabled={isApplyingCoupon}
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isApplyingCoupon}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-semibold active:scale-95"
            >
              {isApplyingCoupon ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Apply'
              )}
            </button>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={isCheckoutDisabled}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] flex items-center justify-center gap-2 group mb-3"
        >
          Proceed to Checkout
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onContinueShopping}
          className="w-full py-2.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
        >
          Continue Shopping
        </button>

        {/* Security Badge */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <FiShield className="w-3.5 h-3.5" />
            <span>256-bit SSL Secure Checkout</span>
          </div>
          <div className="flex justify-center gap-3 mt-3">
            <span className="text-gray-300 text-lg">💳</span>
            <span className="text-gray-300 text-lg">📱</span>
            <span className="text-gray-300 text-lg">🏦</span>
            <span className="text-gray-300 text-lg">🅿️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
