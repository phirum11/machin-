export const filterProducts = (products, filters, sortBy = 'newest', sortOrder = 'desc') => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.priceRange) {
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );
  }

  if (filters.rating > 0) {
    filtered = filtered.filter((p) => (p.rating || 0) >= filters.rating);
  }

  if (filters.inStock) {
    filtered = filtered.filter((p) => (p.stock || 0) > 0);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }

  filtered.sort((a, b) => {
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
      default:
        cmp = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  return filtered;
};
