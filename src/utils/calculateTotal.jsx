export const calculateTotal = (items, coupon = null, shippingRate = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  let discount = 0;

  if (coupon) {
    if (coupon.type === 'percent') {
      discount = subtotal * (coupon.value / 100);
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }

  const shipping = subtotal > 0 ? shippingRate : 0;
  const total = subtotal - discount + tax + shipping;

  return { subtotal, tax, discount, shipping, total };
};
