import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiCheck,
  FiLock,
  FiCreditCard,
  FiTruck,
  FiClipboard,
  FiArrowLeft,
  FiArrowRight,
  FiShoppingBag
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import {
  calculateSubtotal,
  calculateShipping,
  calculateTax,
  calculateTotal
} from '../utils/calculateTotal';
import { formatCurrency } from '../utils/formatCurrency';
import MainLayout from '../layout/MainLayout';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateTotal({ subtotal, shipping, tax });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep = (s) => {
    const errs = {};
    if (s === 0) {
      if (!form.firstName.trim()) errs.firstName = 'First name is required';
      if (!form.lastName.trim()) errs.lastName = 'Last name is required';
      if (!form.email.trim()) errs.email = 'Email is required';
      else if (!validateEmail(form.email)) errs.email = 'Enter a valid email';
      if (!form.address.trim()) errs.address = 'Address is required';
      if (!form.city.trim()) errs.city = 'City is required';
      if (!form.state.trim()) errs.state = 'State is required';
      if (!form.zip.trim()) errs.zip = 'ZIP code is required';
      if (!form.country.trim()) errs.country = 'Country is required';
    }
    if (s === 1) {
      if (!form.cardName.trim()) errs.cardName = 'Name on card is required';
      if (!form.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      else if (!/^[\d ]{12,19}$/.test(form.cardNumber.replace(/-/g, '')))
        errs.cardNumber = 'Enter a valid card number';
      if (!form.expiry.trim()) errs.expiry = 'Expiry date is required';
      if (!form.cvv.trim()) errs.cvv = 'CVV is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    // Re-validate both previous steps before placing
    const s0 = validateStep(0);
    if (!s0) {
      setStep(0);
      return;
    }
    const s1 = validateStep(1);
    if (!s1) {
      setStep(1);
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  // ── Input helper ───────────────────────────────────────────────
  const inputCls = (name) =>
    `w-full border-2 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-4 outline-none transition-all dark:bg-gray-800/60 dark:text-gray-100 placeholder-gray-400 ${
      errors[name]
        ? 'border-red-400 dark:border-red-500 focus:ring-red-500/10 focus:border-red-500'
        : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-600'
    }`;

  const fieldError = (name) =>
    errors[name] ? (
      <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
    ) : null;

  // ── Order placed screen ────────────────────────────────────────
  if (orderPlaced) {
    return (
      <MainLayout>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
            <FiCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Order Placed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.97]"
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Checkout
        </h1>

        {/* ── Stepper ─────────────────────────────────────────── */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => {
            const StepIcon =
              i === 0 ? FiTruck : i === 1 ? FiCreditCard : FiClipboard;
            return (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      i < step
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md shadow-green-500/20'
                        : i === step
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {i < step ? (
                      <FiCheck className="w-4 h-4" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`font-semibold text-sm ${
                      i === step
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : i < step
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 rounded-full transition-colors ${
                      i < step
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Form card ──────────────────────────────────────── */}
          <div className="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white/30 dark:border-gray-700/40 p-6 sm:p-8">
            {/* Step 0 — Shipping */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Shipping Information
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
                  Where should we deliver your order?
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['firstName', 'First Name'],
                    ['lastName', 'Last Name']
                  ].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label} *
                      </label>
                      <input
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={inputCls(name)}
                      />
                      {fieldError(name)}
                    </div>
                  ))}
                  {[
                    ['email', 'Email', 'col-span-2'],
                    ['phone', 'Phone (optional)', 'col-span-2'],
                    ['address', 'Address', 'col-span-2'],
                    ['city', 'City', ''],
                    ['state', 'State', ''],
                    ['zip', 'ZIP Code', ''],
                    ['country', 'Country', '']
                  ].map(([name, label, span]) => (
                    <div key={name} className={span}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label}
                        {name !== 'phone' ? ' *' : ''}
                      </label>
                      <input
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={inputCls(name)}
                      />
                      {fieldError(name)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1 — Payment */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Payment Details
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-5 flex items-center gap-1.5">
                  <FiLock size={13} /> Your payment info is secure
                </p>
                <div className="space-y-4">
                  {[
                    ['cardName', 'Name on Card'],
                    ['cardNumber', 'Card Number']
                  ].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label} *
                      </label>
                      <input
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={inputCls(name)}
                      />
                      {fieldError(name)}
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ['expiry', 'Expiry (MM/YY)'],
                      ['cvv', 'CVV']
                    ].map(([name, label]) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {label} *
                        </label>
                        <input
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          className={inputCls(name)}
                        />
                        {fieldError(name)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Review */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Order Review
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
                  Please confirm your items
                </p>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-800 pb-3"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Navigation buttons ──────────────────────────── */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                  <FiArrowLeft size={15} /> Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={
                  step === steps.length - 1 ? handlePlaceOrder : handleContinue
                }
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.97] cursor-pointer"
              >
                {step === steps.length - 1 ? (
                  <>
                    <FiShoppingBag size={15} /> Place Order
                  </>
                ) : (
                  <>
                    Continue <FiArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Order Summary ──────────────────────────────────── */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white/30 dark:border-gray-700/40 p-6 h-fit">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
