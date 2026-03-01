import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiLock } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { calculateTotal } from '../utils/calculateTotal';

const STEPS = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, coupon } = useCart();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '',
    city: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  });

  const { subtotal, shipping, tax, discount, total } = calculateTotal(cart, coupon);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheck className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Order Placed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i < step ? <FiCheck className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`font-medium text-sm ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input name="address" value={form.address} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="New York" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="10001" />
                </div>
              </div>
              <button onClick={() => setStep(1)} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <FiLock className="w-5 h-5 text-green-600" /> Payment Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                <input name="cardNumber" value={form.cardNumber} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cardholder Name</label>
                <input name="cardName" value={form.cardName} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry</label>
                  <input name="expiry" value={form.expiry} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="MM/YY" maxLength={5} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                  <input name="cvv" value={form.cvv} onChange={handleChange} type="password" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="•••" maxLength={4} />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Back
                </button>
                <button onClick={() => setStep(2)} className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Review & Place Order</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{item.name} × {item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t dark:border-gray-600 pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg"><span>Total</span><span>{formatCurrency(total)}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <FiLock className="w-4 h-4" /> Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Items ({cart.length})</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (8%)</span><span>{formatCurrency(tax)}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
          </div>
          <div className="border-t dark:border-gray-600 pt-3 flex justify-between font-bold text-gray-900 dark:text-white">
            <span>Total</span><span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
