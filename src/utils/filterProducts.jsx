/**
 * Filters and sorts a product list based on the given filters and sort options.
 *
 * @param {Array} products - Full product list.
 * @param {object} filters - Active filter values.
 * @param {string} sortBy - Field to sort by.
 * @param {string} sortOrder - 'asc' or 'desc'.
 * @returns {Array} Filtered and sorted products.
 */
export const filterProducts = (products = [], filters = {}, sortBy = 'newest', sortOrder = 'desc') => {
  let result = [...products];

  const { category, priceRange, rating, inStock, search } = filters;

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (priceRange) {
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
  }

  if (rating > 0) {
    result = result.filter(p => (p.rating || 0) >= rating);
  }

  if (inStock) {
    result = result.filter(p => (p.stock || 0) > 0);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }

  result.sort((a, b) => {
    let cmp = 0;
    switch (sortBy) {
      case 'name':
        cmp = a.name.localeCompare(b.name);
        break;
      case 'price':
        cmp = a.price - b.price;
        break;
      case 'rating':
        cmp = (a.rating || 0) - (b.rating || 0);
        break;
      case 'popularity':
        cmp = (a.soldCount || 0) - (b.soldCount || 0);
        break;
      case 'newest':
      default:
        cmp = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  return result;
};

export default filterProducts;
