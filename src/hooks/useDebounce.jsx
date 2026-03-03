import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the provided value.
 *
 * @param {*} value - Value to debounce.
 * @param {number} [delay=300] - Debounce delay in milliseconds.
 * @returns {*} Debounced value.
 */
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
