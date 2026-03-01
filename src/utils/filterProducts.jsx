export const filterProducts = (products, filters, sortBy, sortOrder) => {
  let filtered = [...products];
  if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
  filtered = filtered.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
  if (filters.rating > 0) filtered = filtered.filter(p => (p.rating || 0) >= filters.rating);
  if (filters.inStock) filtered = filtered.filter(p => (p.stock || 0) > 0);
  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.description?.toLowerCase().includes(s) ||
      p.category?.toLowerCase().includes(s)
    );
  }
  filtered.sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'price') cmp = a.price - b.price;
    else if (sortBy === 'rating') cmp = (a.rating || 0) - (b.rating || 0);
    else if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortBy === 'popularity') cmp = (a.soldCount || 0) - (b.soldCount || 0);
    return sortOrder === 'asc' ? cmp : -cmp;
  });
  return filtered;
};
