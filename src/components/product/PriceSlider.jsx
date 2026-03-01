import React, { useState, useEffect, useRef } from 'react';

const PriceSlider = ({ min = 0, max = 1000, value, onChange }) => {
  const [minValue, setMinValue] = useState(value?.min || min);
  const [maxValue, setMaxValue] = useState(value?.max || max);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(newMin);
    onChange?.({ min: newMin, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(newMax);
    onChange?.({ min: minValue, max: newMax });
  };

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Slider Container */}
      <div className="relative h-2" ref={sliderRef}>
        {/* Background track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
        
        {/* Colored track between handles */}
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${getPercentage(minValue)}%`,
            width: `${getPercentage(maxValue) - getPercentage(minValue)}%`
          }}
        />

        {/* Min handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: minValue > max - 100 ? 2 : 1 }}
        />

        {/* Max handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
        />
      </div>

      {/* Price inputs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={minValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= min && val <= maxValue - 10) {
                  setMinValue(val);
                  onChange?.({ min: val, max: maxValue });
                }
              }}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="text-gray-400">-</div>

        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= max && val >= minValue + 10) {
                  setMaxValue(val);
                  onChange?.({ min: minValue, max: val });
                }
              }}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>${min}</span>
        <span>Selected: ${minValue} - ${maxValue}</span>
        <span>${max}</span>
      </div>
    </div>
  );
};

export default PriceSlider;