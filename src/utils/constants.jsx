export const COUPONS = {
  SAVE10: { code: 'SAVE10', type: 'percent', value: 10, label: '10% off' },
  SAVE20: { code: 'SAVE20', type: 'percent', value: 20, label: '20% off' },
  FLAT50: { code: 'FLAT50', type: 'fixed', value: 50, label: '$50 off' }
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popularity', label: 'Most Popular' }
];

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
  'Automotive'
];

export const SHIPPING_RATE = 9.99;
export const FREE_SHIPPING_THRESHOLD = 100;
