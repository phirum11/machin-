export const APP_NAME = 'AccountPro';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  DASHBOARD: '/dashboard',
  ORDER_TRACKING: '/order-tracking',
  NOT_FOUND: '*'
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
  { value: 'popularity', label: 'Popularity' }
];

export const FREE_SHIPPING_THRESHOLD = 100;
export const DEFAULT_TAX_RATE = 0.1;
export const DEFAULT_SHIPPING_COST = 9.99;

export const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
];

export const COUPON_CODES = {
  SAVE10: { type: 'percent', value: 10 },
  SAVE20: { type: 'percent', value: 20 },
  FLAT15: { type: 'fixed', value: 15 }
};
