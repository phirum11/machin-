import { SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from './constants';

export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateShipping = (subtotal) => {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
};

export const calculateTax = (subtotal) => {
  return subtotal * TAX_RATE;
};

export const calculateDiscount = (subtotal, coupon) => {
  if (!coupon) return 0;
  if (typeof coupon.discount === 'number') {
    return subtotal * coupon.discount;
  }
  return 0;
};

export const calculateTotal = (items, coupon = null) => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal, coupon);
  return { subtotal, shipping, tax, discount, total: subtotal + shipping + tax - discount };
};
