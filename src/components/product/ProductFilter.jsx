import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import PriceSlider from './PriceSlider';

const ProductFilter = ({ filters, onFilterChange, categories = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: '',
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      inStock: false
    };
    setLocalFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40"
      >
        <FiFilter className="w-5 h-5" />
      </button>

      {/* Filter Sidebar - Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <FilterContent
          filters={localFilters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
          categories={categories}
        />
      </div>

      {/* Filter Sidebar - Mobile */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent
                filters={localFilters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
                categories={categories}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const FilterContent = ({ filters, onFilterChange, onClear, categories }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => onFilterChange('category', e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <PriceSlider
          min={0}
          max={1000}
          value={filters.priceRange}
          onChange={(range) => onFilterChange('priceRange', range)}
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => onFilterChange('rating', Number(e.target.value))}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{rating}+ stars</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">In stock only</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;