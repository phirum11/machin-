export const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popularity', label: 'Most Popular' },
];

export const COUPONS = {
  SAVE10: { discount: 0.10, type: 'percentage', description: '10% off' },
  SAVE20: { discount: 0.20, type: 'percentage', description: '20% off' },
  FLAT50: { discount: 50, type: 'flat', description: '$50 off' },
};

export const SHIPPING_THRESHOLD = 50;
export const SHIPPING_COST = 9.99;
export const TAX_RATE = 0.08;
