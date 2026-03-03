import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';

const RatingStars = ({
  rating = 0,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRate,
  showValue = true,
  reviewCount,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const displayRating = hoverRating || rating;

  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  const getStarFill = (index) => {
    const diff = displayRating - index;
    if (diff >= 1) return 'full';
    if (diff >= 0.5) return 'half';
    return 'empty';
  };

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const fill = getStarFill(index);
        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => interactive && setHoverRating(index + 1)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`relative ${interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'} transition-transform duration-150`}
            disabled={!interactive}
            aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
          >
            {/* Empty star background */}
            <FiStar
              className={`${sizes[size]} text-gray-300 dark:text-gray-600`}
            />
            {/* Filled overlay */}
            {fill !== 'empty' && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: fill === 'half' ? '50%' : '100%' }}
              >
                <FiStar
                  className={`${sizes[size]} fill-yellow-400 text-yellow-400`}
                />
              </div>
            )}
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
          ({displayRating.toFixed(1)})
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-400 dark:text-gray-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
