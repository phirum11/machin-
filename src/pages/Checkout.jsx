import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiCreditCard, FiTruck, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { calculateTotal } from '../utils/calculateTotal';
import { SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from '../utils/constants';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const STEPS = ['Contact', 'Shipping', 'Payment'];

const Checkout = () => {
  const { cart, coupon, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: ''
  });
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingRate = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const { tax, discount, shipping, total } = calculateTotal(cart, coupon, shippingRate);

  const updateField = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!form.firstName) newErrors.firstName = 'Required';
      if (!form.lastName) newErrors.lastName = 'Required';
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    }
    if (step === 1) {
      if (!form.address) newErrors.address = 'Required';
      if (!form.city) newErrors.city = 'Required';
      if (!form.zip) newErrors.zip = 'Required';
    }
    if (step === 2) {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Valid card number required';
      if (!form.expiry) newErrors.expiry = 'Required';
      if (!form.cvv || form.cvv.length < 3) newErrors.cvv = 'Valid CVV required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      clearCart();
      setOrderSuccess(true);
    }
  };

  if (cart.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < step ? 'bg-green-500 text-white' :
                i === step ? 'bg-blue-600 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {i < step ? <FiCheck className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-blue-600' : 'text-gray-500'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {step === 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-blue-600" /> Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" value={form.firstName} onChange={e => updateField('firstName', e.target.value)} error={errors.firstName} required />
                  <Input label="Last Name" value={form.lastName} onChange={e => updateField('lastName', e.target.value)} error={errors.lastName} required />
                  <div className="col-span-2">
                    <Input label="Email" type="email" value={form.email} onChange={e => updateField('email', e.target.value)} error={errors.email} required />
                  </div>
                  <div className="col-span-2">
                    <Input label="Phone" type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FiTruck className="w-5 h-5 text-blue-600" /> Shipping Address
                </h2>
                <div className="space-y-4">
                  <Input label="Street Address" value={form.address} onChange={e => updateField('address', e.target.value)} error={errors.address} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="City" value={form.city} onChange={e => updateField('city', e.target.value)} error={errors.city} required />
                    <Input label="State / Province" value={form.state} onChange={e => updateField('state', e.target.value)} />
                    <Input label="ZIP / Postal Code" value={form.zip} onChange={e => updateField('zip', e.target.value)} error={errors.zip} required />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country <span className="text-red-500">*</span></label>
                      <select value={form.country} onChange={e => updateField('country', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5 text-blue-600" /> Payment Details
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    value={form.cardNumber}
                    onChange={e => updateField('cardNumber', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))}
                    placeholder="1234 5678 9012 3456"
                    error={errors.cardNumber}
                    required
                  />
                  <Input label="Name on Card" value={form.nameOnCard} onChange={e => updateField('nameOnCard', e.target.value)} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry (MM/YY)" value={form.expiry} onChange={e => updateField('expiry', e.target.value)} placeholder="MM/YY" error={errors.expiry} required />
                    <Input label="CVV" value={form.cvv} onChange={e => updateField('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" error={errors.cvv} required />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 0 && (
                <Button variant="secondary" onClick={() => setStep(s => s - 1)}>
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="flex-1">
                {step === STEPS.length - 1 ? 'Place Order' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">{item.name} × {item.quantity}</span>
                  <span className="font-medium whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2 mt-2">
                <span>Total</span><span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={orderSuccess}
        onClose={() => { setOrderSuccess(false); navigate('/'); }}
        title="Order Placed Successfully! 🎉"
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Thank you for your order! You&apos;ll receive a confirmation email shortly.
          </p>
          <Button onClick={() => { setOrderSuccess(false); navigate('/'); }} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
