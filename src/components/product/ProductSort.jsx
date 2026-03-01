import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const ProductSort = ({ sortBy, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest' },
    { value: 'popularity', label: 'Popularity' }
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange({ sortBy: e.target.value, sortOrder })}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => onSortChange({ sortBy, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Toggle sort order"
      >
        {sortOrder === 'asc' ? (
          <FiArrowUp className="w-4 h-4" />
        ) : (
          <FiArrowDown className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default ProductSort;