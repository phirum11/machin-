import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { calculateSubtotal, calculateShipping, calculateTax, calculateTotal } from '../utils/calculateTotal';
import { formatCurrency } from '../utils/formatCurrency';
import MainLayout from '../layout/MainLayout';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateTotal({ subtotal, shipping, tax });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <MainLayout>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
          <p className="text-gray-500 mb-8">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {i < step ? <FiCheck className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`font-medium text-sm ${i === step ? 'text-blue-600' : 'text-gray-500'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {step === 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  ))}
                  {[['email', 'Email', 'col-span-2'], ['phone', 'Phone', 'col-span-2'], ['address', 'Address', 'col-span-2'], ['city', 'City', ''], ['state', 'State', ''], ['zip', 'ZIP Code', ''], ['country', 'Country', '']].map(([name, label, span]) => (
                    <div key={name} className={span}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <div className="space-y-4">
                  {[['cardName', 'Name on Card'], ['cardNumber', 'Card Number']].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    {[['expiry', 'Expiry (MM/YY)'], ['cvv', 'CVV']].map(([name, label]) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Review</h2>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm border-b pb-3">
                      <span className="text-gray-700">{item.name} × {item.quantity}</span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
              )}
              <button
                onClick={step === steps.length - 1 ? handlePlaceOrder : () => setStep(s => s + 1)}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {step === steps.length - 1 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
