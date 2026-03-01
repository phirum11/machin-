/**
 * Calculates the cart subtotal from an array of cart items.
 *
 * @param {Array<{price: number, quantity: number}>} items - Cart items.
 * @returns {number} Subtotal amount.
 */
export const calculateSubtotal = (items = []) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/**
 * Calculates the tax amount.
 *
 * @param {number} subtotal - The subtotal before tax.
 * @param {number} [taxRate=0.1] - Tax rate as a decimal (default 10%).
 * @returns {number} Tax amount.
 */
export const calculateTax = (subtotal, taxRate = 0.1) => subtotal * taxRate;

/**
 * Calculates the shipping cost.
 *
 * @param {number} subtotal - Cart subtotal.
 * @param {number} [freeShippingThreshold=100] - Subtotal required for free shipping.
 * @param {number} [shippingCost=9.99] - Fixed shipping cost when not free.
 * @returns {number} Shipping cost.
 */
export const calculateShipping = (
  subtotal,
  freeShippingThreshold = 100,
  shippingCost = 9.99
) => (subtotal >= freeShippingThreshold ? 0 : shippingCost);

/**
 * Applies a coupon discount to a subtotal.
 *
 * @param {number} subtotal
 * @param {{ type: 'percent'|'fixed', value: number } | null} coupon
 * @returns {number} Discount amount.
 */
export const calculateDiscount = (subtotal, coupon) => {
  if (!coupon) return 0;
  if (coupon.type === 'percent') return subtotal * (coupon.value / 100);
  if (coupon.type === 'fixed') return Math.min(coupon.value, subtotal);
  return 0;
};

/**
 * Calculates the order grand total.
 *
 * @param {object} params
 * @param {number} params.subtotal
 * @param {number} [params.shipping=0]
 * @param {number} [params.tax=0]
 * @param {number} [params.discount=0]
 * @returns {number} Grand total.
 */
export const calculateTotal = ({ subtotal, shipping = 0, tax = 0, discount = 0 }) =>
  Math.max(0, subtotal + shipping + tax - discount);
