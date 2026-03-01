import React from 'react';
import { FiStar } from 'react-icons/fi';

const RatingStars = ({ 
  rating = 0, 
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRate,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} 
                     ${interactive && 'hover:scale-110 transition-transform'}`}
          disabled={!interactive}
          aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
        >
          <FiStar
            className={`${sizes[size]} transition-colors ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export default RatingStars;