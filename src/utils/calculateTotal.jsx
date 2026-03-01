import { SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from './constants';

export const calculateSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const calculateShipping = (subtotal) =>
  subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

export const calculateDiscount = (subtotal, coupon) => {
  if (!coupon) return 0;
  if (coupon.type === 'percentage') return subtotal * coupon.discount;
  if (coupon.type === 'flat') return Math.min(coupon.discount, subtotal);
  return 0;
};

export const calculateTax = (subtotal) => subtotal * TAX_RATE;

export const calculateTotal = (items, coupon = null) => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal, coupon);
  const tax = calculateTax(subtotal - discount);
  return { subtotal, shipping, discount, tax, total: subtotal - discount + shipping + tax };
};
